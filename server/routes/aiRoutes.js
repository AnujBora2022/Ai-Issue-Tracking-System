import express from "express";
import { generateIssueSummary } from "../controllers/aiController.js";


const router = express.Router();
router.post("/summarize", generateIssueSummary);
export default router;
