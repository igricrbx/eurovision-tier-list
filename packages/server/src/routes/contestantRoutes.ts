import express from "express";
import { getAllContestants, getContestantById } from "../controllers/contestantController";

const router = express.Router();

// Get all contestants
router.get("/", getAllContestants);

// Get contestant by ID
router.get("/:id", getContestantById);

export default router;