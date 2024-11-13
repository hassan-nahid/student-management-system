import express from "express";
import { createNotice, deleteNotice, getAllNotices } from "../controllers/noticeController.js";

const router = express.Router();

// POST /api/notices - Create a new notice
router.post("/", createNotice);

// GET /api/notices - Get all notices
router.get("/", getAllNotices);

// DELETE /api/notices/:id - Delete a notice by ID
router.delete("/:id", deleteNotice);

export default router;
