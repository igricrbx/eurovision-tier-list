import express from "express";
import { createTierList, getUserTierLists, getTierList, updateTierList, deleteTierList } from "../controllers/tierListController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Create a new tier list
router.post("/", auth, createTierList);

// Get all tier lists for current user
router.get("/", auth, getUserTierLists);

// Get tier list by ID or share code
router.get("/:idOrCode", auth, getTierList);

// Update tier list
router.put("/:id", auth, updateTierList);

// Delete tier list
router.delete("/:id", auth, deleteTierList);

export default router;