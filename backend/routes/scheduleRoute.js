import express from "express";
import {
  getSchedules,
  getSchedulesByClass,
  addSchedule,
  updateSchedule,
  deleteSchedule,
  getSchedulesById,
} from "../controllers/scheduleController.js";
import { verifyAdmin } from "../middleware/AdminVerify.js";

const router = express.Router();

// GET all schedules
router.get("/", verifyAdmin, getSchedules);

// GET schedules by class
router.get("/:classNumber", getSchedulesByClass);

// GET schedules by ID
router.get("/single/:id", verifyAdmin, getSchedulesById);

// POST add a new schedule
router.post("/", verifyAdmin, addSchedule);

// PUT update a schedule by ID
router.put("/:id", verifyAdmin, updateSchedule);

// DELETE a schedule by ID
router.delete("/:id", verifyAdmin, deleteSchedule);

export default router;
