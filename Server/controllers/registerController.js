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
