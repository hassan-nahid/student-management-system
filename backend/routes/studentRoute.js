import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/studentController.js";
import express from 'express';
import { verifyAdmin } from "../middleware/AdminVerify.js";

const router = express.Router();

// Route to create a new student
router.post('/', verifyAdmin, createStudent);

// Route to get all students
router.get('/', verifyAdmin, getAllStudents);

// Route to get a single student by ID
router.get('/:id', verifyAdmin, getStudentById);

// Route to update a student by ID
router.put('/:id', verifyAdmin, updateStudent);

// Route to delete a student by ID
router.delete('/:id', verifyAdmin, deleteStudent);

export default router;