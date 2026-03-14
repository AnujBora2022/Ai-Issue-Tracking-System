import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createProject,
  getProjects,
  deleteProject,
  addMember,
  getProjectIssues
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.delete("/:id", authMiddleware, deleteProject);
router.post("/:id/members", authMiddleware, addMember);
router.get("/:id/issues", authMiddleware, getProjectIssues);

export default router;
