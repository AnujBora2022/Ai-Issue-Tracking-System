import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getActivity } from "../controllers/activityController.js";

const router = express.Router();

router.get("/:projectId", authMiddleware, getActivity);

export default router;
