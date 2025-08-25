import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { sendEmail } from "../utils/emailService.js";
import bcrypt from "bcrypt";


export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 🔍 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    // 🔑 Create reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 📌 Set token in HTTP-only cookie
    res.cookie("resetToken", resetToken, {
      httpOnly: true,       // not accessible by JS
      secure: process.env.NODE_ENV === "production", // HTTPS only in prod
      sameSite: "Strict",   // CSRF protection
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // 🔗 Create reset link (optional, still can email it)
    const resetLink = `http://localhost:3000/reset-password`;

    // 📧 Send email with the link (token is in cookie)
    try {
      await sendEmail(
        email,
        "Password Reset Request",
        `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
        `
      );
    } catch (emailErr) {
      console.error("Error sending email:", emailErr);
      return res.json({ message: "If this email exists, a reset link has been sent." });
    }

    return res.json({ message: "If this email exists, a reset link has been sent." });

  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
};


export const resetPassword = async (req, res) => {
  console.log("Body:", req.body);
  console.log("Cookies:", req.cookies);
  const { password } = req.body; // new password from frontend form
  const resetToken = req.cookies.resetToken; // ✅ get token from cookie

  if (!resetToken) {
    return res.status(400).json({ message: "Reset token missing" });
  }

  try {
    // 1️⃣ Verify token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);

    // 2️⃣ Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // 3️⃣ Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Update user’s password
    user.password = hashedPassword;
    await user.save();

    // 5️⃣ Clear the cookie after successful reset
    res.clearCookie("resetToken");

    return res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Reset password error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
};

