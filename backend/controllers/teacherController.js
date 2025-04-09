import Teacher from "../models/teacherModel.js";

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const teacher = new Teacher(req.body); // Directly pass the request body to create the teacher
    await teacher.save();
    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a teacher by ID
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher updated successfully', teacher });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a teacher by ID
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get teacher by email
export const getTeacherByEmail = async (req, res) => {
  try {
      const { email } = req.params;
      const teacher = await Teacher.findOne({ email });

      if (!teacher) {
          return res.status(404).json({ message: 'Teacher not found' });
      }

      res.status(200).json(teacher);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};