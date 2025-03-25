import express from "express";
import { submitMarks } from "../controllers/marksController.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";

const router = express.Router();


router.post("/", verifyTeacher, submitMarks);

export default router;
