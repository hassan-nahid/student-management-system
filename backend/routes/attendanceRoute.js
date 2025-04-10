import express from "express";
import { verifyTeacher } from "../middleware/TeacherVerify.js";
import { submitAttendance, getAttendanceByClass, getStudentAttendance } from "../controllers/attendanceController.js";
import { verifyStudent } from "../middleware/StudentVerify.js";

const router = express.Router();

// Route to submit attendance
router.post("/", verifyTeacher, submitAttendance);

// Route to fetch attendance records by class
router.get("/:class", verifyTeacher , getAttendanceByClass);
// GET /api/attendance/student/:roll
router.get("/student/:roll", verifyStudent, getStudentAttendance);


export default router;
