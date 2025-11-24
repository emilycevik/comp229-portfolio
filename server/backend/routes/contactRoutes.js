import express from "express";
import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../controllers/contactController.js";

// 🆕 import authentication middleware
import { requireAuth, requireRole } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 Public route — anyone can send a contact form
router.post("/", createContact);

// 🔒 Admin routes — only admin can view or manage contacts
router.get("/", requireAuth, requireRole("admin"), getContacts);
router.get("/:id", requireAuth, requireRole("admin"), getContactById);
router.put("/:id", requireAuth, requireRole("admin"), updateContact);
router.delete("/:id", requireAuth, requireRole("admin"), deleteContact);

export default router;
