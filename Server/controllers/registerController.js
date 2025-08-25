import bcrypt from "bcrypt";
import User from "../models/userModel.js"; // modern import

export async function registerUser(req, res) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      phoneNumber,
      password,
      confirmPassword,
    } = req.body;
    console.log("req.body:", req.body);

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      dateOfBirth,
      phoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
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
