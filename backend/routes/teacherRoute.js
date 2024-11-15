import express from 'express';
import { createTeacher, deleteTeacher, getAllTeachers, getTeacherById, updateTeacher } from '../controllers/teacherController.js';
import { verifyAdmin } from '../middleware/AdminVerify.js';

const router = express.Router();

// POST route to add a new teacher
router.post('/',verifyAdmin, createTeacher);
// Route to get all students
router.get('/', verifyAdmin, getAllTeachers);

// Route to get a single student by ID
router.get('/:id', verifyAdmin, getTeacherById);

// Route to update a student by ID
router.put('/:id', verifyAdmin, updateTeacher);

// Route to delete a student by ID
router.delete('/:id',verifyAdmin, deleteTeacher);

export default router;
