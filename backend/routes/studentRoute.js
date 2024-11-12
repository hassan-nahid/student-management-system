import { createStudent, deleteStudent, getAllStudents, getStudentById, updateStudent } from "../controllers/studentController.js";
import express from 'express';

const router = express.Router();

// Route to create a new student
router.post('/', createStudent);

// Route to get all students
router.get('/', getAllStudents);

// Route to get a single student by ID
router.get('/:id', getStudentById);

// Route to update a student by ID
router.put('/:id', updateStudent);

// Route to delete a student by ID
router.delete('/:id', deleteStudent);

export default router;