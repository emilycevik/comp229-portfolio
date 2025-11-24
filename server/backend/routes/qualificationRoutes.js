import express from "express";
import {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
} from "../controllers/qualificationController.js";

// 🆕 import authentication middleware
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Public routes — anyone can view qualifications
router.get("/", getQualifications);
router.get("/:id", getQualificationById);

// 🔒 Admin routes — only admin can modify data
router.post("/", requireAuth, requireRole("admin"), createQualification);
router.put("/:id", requireAuth, requireRole("admin"), updateQualification);
router.delete("/:id", requireAuth, requireRole("admin"), deleteQualification);

export default router;
