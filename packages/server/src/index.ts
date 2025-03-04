import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";
import userRoutes from "./routes/userRoutes";
import contestantRoutes from "./routes/contestantRoutes";
import tierListRoutes from "./routes/tierListRoutes";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/contestants", contestantRoutes);
app.use("/api/tierlists", tierListRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("Eurovision Tier List API is running");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});