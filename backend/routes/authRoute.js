import express from 'express';
import { adminAuth, studentAuth, teacherAuth } from '../controllers/authController.js';

const router = express.Router();

// Route to create a new student
router.post('/admin', adminAuth);
router.post('/teacher', teacherAuth);
router.post('/student', studentAuth);



export default router;