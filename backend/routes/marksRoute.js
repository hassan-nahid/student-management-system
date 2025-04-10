import express from "express";
import { getMarksByTeacher, getResultByRoll, submitMarks } from "../controllers/marksController.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";
import { verifyStudent } from "../middleware/StudentVerify.js";

const router = express.Router();


router.post("/", verifyTeacher, submitMarks);
router.get("/:email", verifyTeacher, getMarksByTeacher);
router.get("/result/:roll", getResultByRoll);


export default router;
