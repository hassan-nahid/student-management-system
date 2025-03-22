import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema(
  {
    class: {
      type: String,
      required: true,
    },
    attendance: [
      {
        roll: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['Present', 'Absent'],
          required: true,
        },
      },
    ],
    teacherEmail: {
      type: String,
      required: true,
    },
    date: { // Added date field to store the attendance date
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
