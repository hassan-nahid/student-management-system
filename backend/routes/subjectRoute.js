import express from 'express';
import { addSubject } from '../controllers/subjectController.js';
import { verifyAdmin } from '../middleware/AdminVerify.js';

const router = express.Router();

router.post('/add',verifyAdmin, addSubject);

// You can add more routes for other CRUD operations here, e.g., GET, PUT, DELETE

export default router;
