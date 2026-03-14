import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  addComment,
  getComments,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", authMiddleware, addComment);
router.get("/:issueId", authMiddleware, getComments);
router.delete("/:id", authMiddleware, deleteComment);

export default router;
