import Student from "../models/studentModel.js";

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ message: 'Student created successfully', student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentByClass = async (req, res) => {
  try{
    const students = await Student.find({ class: req.params.class });
    if (!students) return res.status(404).json({ message: 'Students not found' });
    res.status(200).json(students);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
}
export const getStudentByEmail = async (req, res) => {
  try {
      const { email } = req.params;
      const student = await Student.findOne({ email });
      
      if (!student) {
          return res.status(404).json({ message: "Student not found" });
      }
      
      res.status(200).json(student);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
  }
};