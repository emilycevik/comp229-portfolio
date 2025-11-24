// backend/routes/projectRoutes.js
import express from "express";
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} from "../controllers/projectController.js";

// 🆕 import authentication middleware
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Public routes – anyone can view projects
router.get("/", getProjects);
router.get("/:id", getProjectById);

// 🔒 Protected routes – only admin can modify data
router.post("/", requireAuth, requireRole("admin"), createProject);
router.put("/:id", requireAuth, requireRole("admin"), updateProject);
router.delete("/:id", requireAuth, requireRole("admin"), deleteProject);
router.delete("/", requireAuth, requireRole("admin"), deleteAllProjects);

export default router;
