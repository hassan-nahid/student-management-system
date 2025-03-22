import { createStudent, deleteStudent, getAllStudents, getStudentByClass, getStudentById, updateStudent } from "../controllers/studentController.js";
import express from 'express';
import { verifyAdmin } from "../middleware/AdminVerify.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";

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

// Route to get students by class
router.get('/class/:class', verifyTeacher, getStudentByClass);

export default router;