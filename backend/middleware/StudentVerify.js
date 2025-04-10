import jwt from 'jsonwebtoken';
import Student from '../models/studentModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyStudent = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the student exists in the database
    const student = await Student.findOne({ email: decoded.email });
    if (!student) {
      return res.status(403).json({ message: 'Forbidden: Student access only' });
    }

    // Optionally attach student data to req for future use
    req.user = student;

    next(); // Allow access
  } catch (error) {
    console.error("Student Verification Error:", error);
    res.status(403).json({ message: 'Invalid token', error });
  }
};
