import express from 'express';
import { addTeacher } from '../controllers/teacherController.js';

const router = express.Router();

// POST route to add a new teacher
router.post('/', addTeacher);

export default router;
