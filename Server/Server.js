import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
import registerRoutes from "./routes/registerRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// MIDDLEWARE
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",   // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
// TEST ROUTE
app.get("/test", (req, res) => res.send("Server is running!"));

// ROUTES
app.use("/api/register", registerRoutes);

// CONNECT DB AND START SERVER
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT} and DB connected!`)
  );
});

