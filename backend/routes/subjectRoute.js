import express from 'express';
import { addSubject, getSubjectsByClass } from '../controllers/subjectController.js';
import { verifyAdmin } from '../middleware/AdminVerify.js';
import { verifyTeacher } from '../middleware/TeacherVerify.js';

const router = express.Router();

router.post('/add',verifyAdmin, addSubject);
router.get('/class/:class',verifyTeacher, getSubjectsByClass);


// You can add more routes for other CRUD operations here, e.g., GET, PUT, DELETE

export default router;
