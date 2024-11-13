import express from 'express';
import { createTeacher, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from '../controllers/teacherController.js';

const router = express.Router();

// POST route to add a new teacher
router.post('/', createTeacher);
// Route to get all students
router.get('/', getAllTeachers);

// Route to get a single student by ID
router.get('/:id', getTeacherById);

// Route to update a student by ID
router.put('/:id', updateTeacher);

// Route to delete a student by ID
router.delete('/:id', deleteTeacher);

export default router;
