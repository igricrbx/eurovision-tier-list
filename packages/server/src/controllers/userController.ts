import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = userRepository.create({
      email,
      password: hashedPassword,
      username
    });

    await userRepository.save(user);

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get current user
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      username: user.username
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};