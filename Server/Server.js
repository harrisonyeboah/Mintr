import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import registerRoutes from "./routes/registerRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";
import forgotPasswordRoutes from "./routes/forgotPasswordRoutes.js";
import User from "./models/userModel.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",   // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));
// TEST ROUTE
app.get("/test", (req, res) => res.send("Server is running!"));

// ROUTES
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api", forgotPasswordRoutes);

// CONNECT DB AND START SERVER
connectDB().then(async () => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} and DB connected!`)
  );
});

