// routes/messageRoutes.js
import express from "express";
import { getAdminMessages, getMessagesByClass, getTeacherMessages, sendMessage } from "../controllers/messageController.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";
import { verifyStudent } from "../middleware/StudentVerify.js";
import { verifyAdmin } from "../middleware/AdminVerify.js";

const router = express.Router();

router.post("/",verifyTeacher, sendMessage);
router.post("/student",verifyStudent, sendMessage);
router.post("/admin",verifyAdmin, sendMessage);
router.get("/admin",verifyAdmin, getAdminMessages);
router.get("/teacher/:teacherEmail",verifyTeacher, getTeacherMessages);
router.get("/class/:className", verifyStudent,getMessagesByClass);

export default router;
