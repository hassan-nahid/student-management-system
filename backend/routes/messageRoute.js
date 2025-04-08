// routes/messageRoutes.js
import express from "express";
import { sendMessage } from "../controllers/messageController.js";
import { verifyTeacher } from "../middleware/TeacherVerify.js";

const router = express.Router();

router.post("/",verifyTeacher, sendMessage);

export default router;
