import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/emailService.js";

export async function registerUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      password,
      confirmPassword,
    } = req.body;

    // 1️⃣ Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // 2️⃣ Enforce password length (before hashing)
    if (password.length < 12) {
      return res.status(400).json({ message: "Password must be at least 12 characters" });
    }

    // 3️⃣ Enforce age >= 18
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      return res.status(400).json({ message: "You must be at least 18 years old" });
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User or Email already exists" });
    }

    // 5️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6️⃣ Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      password: hashedPassword,
    });

    await newUser.save();

    // 7️⃣ Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 8️⃣ Send verification email
    const verifyLink = `http://localhost:3000/verify`;
    await sendEmail(
      email,
      "Verify Email",
      `<h2>Verify Email</h2>
       <p>Click the link below to verify your email:</p>
       <a href="${verifyLink}" target="_blank">${verifyLink}</a>`
    );

    // 9️⃣ Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 🔟 Respond success
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser._id,
    });

  } catch (err) {
    res.status(500).json({
      message: "Registration failed",
      error: err.message,
    });
  }
}

export async function getUserByEmail(req, res) {
  try {
    const { email } = req.query; // email passed as query parameter
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Find user and exclude password
    const user = await User.findOne({ email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Failed to fetch user", error: err.message });
  }
}

export async function makeVerified(req, res) {
  try {
    // 1️⃣ Get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    // 3️⃣ Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4️⃣ Update verification status
    user.verified = true;
    await user.save();

    // 5️⃣ Respond
    res.json({ message: "User verified successfully" });

  } catch (err) {
    res.status(500).json({ message: "Verification failed", error: err.message });
  }
}