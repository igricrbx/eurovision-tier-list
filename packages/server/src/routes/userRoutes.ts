import express from "express";
import { register, login, getCurrentUser } from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Get current user
router.get("/me", auth, getCurrentUser);

export default router;