import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/userModel.js"; // adjust the path if needed
import dotenv from "dotenv";
dotenv.config();

export async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    console.log("req.body:", req.body);

    // Check if username and password are provided
    if (!username || !password) {
        console.log("Check One")
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
        console.log("Check Two")
      return res.status(401).json({ message: "Invalid username or password" });

    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        console.log("Check Three")
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Optionally, generate a token here (JWT, session, etc.)
    // const token = generateToken(user._id);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET, // <- this reads from .env
        { expiresIn: "1h" }
      );

    res.cookie("token", token, {
        httpOnly: true,      // prevents JS access
        secure: process.env.NODE_ENV === "production", // HTTPS only in prod
        sameSite: "strict",   // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour
      });  

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
}
