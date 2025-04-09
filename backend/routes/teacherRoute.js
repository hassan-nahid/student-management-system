import express from 'express';
import {
    createTeacher,
    deleteTeacher,
    getAllTeachers,
    getTeacherById,
    getTeacherByEmail,
    updateTeacher,
} from '../controllers/teacherController.js';
import { verifyAdmin } from '../middleware/AdminVerify.js';
import { verifyTeacher } from '../middleware/TeacherVerify.js';

const router = express.Router();

// Create a new teacher
router.post('/', verifyAdmin, createTeacher);

// Get all teachers
router.get('/', verifyAdmin, getAllTeachers);

// 🔽 GET teacher by email (must be before `/:id`)
router.get('/email/:email', verifyTeacher, getTeacherByEmail);

// Get a single teacher by ID
router.get('/:id', verifyAdmin, getTeacherById);

// Update a teacher by ID
router.put('/:id', verifyAdmin, updateTeacher);

// Delete a teacher by ID
router.delete('/:id', verifyAdmin, deleteTeacher);

export default router;
