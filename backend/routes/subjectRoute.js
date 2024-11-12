import express from 'express';
import { addSubject } from '../controllers/subjectController.js';

const router = express.Router();

router.post('/add', addSubject);

// You can add more routes for other CRUD operations here, e.g., GET, PUT, DELETE

export default router;
