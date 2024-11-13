import jwt from 'jsonwebtoken';
import Teacher from '../models/teacherModel.js';
import Student from '../models/studentModel.js';

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET;

export const adminAuth = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email matches the admin's email
    const isAdmin = email === process.env.ADMIN_EMAIL;
    if (!isAdmin) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Generate JWT Token with a 7-day expiration
    const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '7d' });

    // Send token and success message to the client
    res.status(200).json({ token, role: 'RFpxdfRxSqgoBt3Z0KJp6HQ6gHXwat8tRSG3UR16qks3ges9K3', message: 'Admin authenticated successfully' });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const teacherAuth = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the teacher exists in the database
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Generate JWT Token with a 7-day expiration
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

    // Send token and success message to the client
    res.status(200).json({ token, role: 'Tz9LVDdijaNPxey25wBMa0jBkBUQRc3czy6pZaUm0q137b3gKK', message: 'Teacher authenticated successfully' });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const studentAuth = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the student exists in the database
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Unauthorized access' });
    }

    // Generate JWT Token with a 7-day expiration
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });

    // Send token and success message to the client
    res.status(200).json({ token, role: 'BqiUqFAbus1UqHCeBA4wBcXWZZCVaojNfQIwODiWTRQmUlcyja', message: 'Student authenticated successfully' });
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};


