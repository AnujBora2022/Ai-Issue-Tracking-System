import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createIssue,
  getIssues,
  updateIssue,
  deleteIssue
} from "../controllers/issueController.js";

const router = express.Router();

router.post("/", authMiddleware, createIssue);
router.get("/:projectId", authMiddleware, getIssues);
router.patch("/:id", authMiddleware, updateIssue);
router.delete("/:id", authMiddleware, deleteIssue);

export default router;
