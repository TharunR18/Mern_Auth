import cors from "cors"
import express from "express"
import dotenv from "dotenv/config"
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import { Router } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;

// Validate required environment variables
if (!process.env.MONGODB_URI) {
    console.error("ERROR: MONGODB_URI is not defined in environment variables");
    process.exit(1);
}
if (!process.env.JWT_SECRET) {
    console.error("ERROR: JWT_SECRET is not defined in environment variables");
    process.exit(1);
}

db();

app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true }))

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.use("/api/auth", Router)
app.use("/api/user", userRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: "404 Route not found" })
})

// Global error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Internal server error" })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})