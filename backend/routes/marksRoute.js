import express from "express";
import { getMarksByTeacher, submitMarks } from "../controllers/marksController.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";

const router = express.Router();


router.post("/", verifyTeacher, submitMarks);
router.get("/:email", verifyTeacher, getMarksByTeacher);

export default router;
