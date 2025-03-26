import express from "express";
import { verifyTeacher } from "../middleware/TeacherVerify.js";
import { submitAttendance, getAttendanceByClass } from "../controllers/attendanceController.js";

const router = express.Router();

// Route to submit attendance
router.post("/", verifyTeacher, submitAttendance);

// Route to fetch attendance records by class
router.get("/:class", verifyTeacher , getAttendanceByClass);

export default router;
