import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherModel.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify teacher by checking if the email exists in the Teacher collection
export const verifyTeacher = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if the email in the token exists in the Teacher model
    const teacher = await Teacher.findOne({ email: decoded.email });
    if (!teacher) {
      return res.status(403).json({ message: 'Forbidden: Teacher access only' });
    }

    next(); // Allow access if the email matches a teacher's email
  } catch (error) {
    console.error("Teacher Verification Error:", error);
    res.status(403).json({ message: 'Invalid token', error });
  }
};
