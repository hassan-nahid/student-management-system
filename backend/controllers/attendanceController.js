import Attendance from '../models/attendanceModel.js';
import Teacher from '../models/teacherModel.js'; // Assuming you have a Teacher model for teachers
import moment from 'moment'; // For handling date comparison

export const submitAttendance = async (req, res) => {
  const { class: selectedClass, attendance, teacherEmail } = req.body;

  if (!selectedClass || !attendance || !teacherEmail) {
    return res.status(400).json({
      message: 'Missing required fields: class, attendance, or teacherEmail.',
    });
  }

  try {
    // Check if the teacher exists
    const teacher = await Teacher.findOne({ email: teacherEmail });
    if (!teacher) {
      return res.status(401).json({
        message: 'Teacher not found or unauthorized.',
      });
    }

    // Get the current date in the format YYYY-MM-DD
    const today = moment().format('YYYY-MM-DD');

    // Check if attendance has already been taken for the selected class today
    const existingAttendance = await Attendance.findOne({
      class: selectedClass,
      date: today, // Assuming your Attendance model has a 'date' field
    });

    if (existingAttendance) {
      return res.status(409).json({
        message: 'Attendance has already been taken for today.',
      });
    }

    // Map the attendance to the student roll numbers
    const attendanceData = attendance.map((entry) => ({
      roll: entry.roll,
      status: entry.status,
    }));

    // Save the attendance data in the database with the current date
    const newAttendance = new Attendance({
      class: selectedClass,
      attendance: attendanceData,
      teacherEmail,
      date: today, // Store the current date to prevent duplicates
    });

    await newAttendance.save();

    res.status(201).json({
      message: 'Attendance submitted successfully!',
      data: newAttendance,
    });
  } catch (error) {
    console.error('Error submitting attendance:', error);
    res.status(500).json({
      message: 'Failed to submit attendance.',
    });
  }
};
