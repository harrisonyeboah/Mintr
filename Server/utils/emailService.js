import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "hotmail", "yahoo", etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Mintr Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("✅ Email sent:", info.messageId);
  } catch (error) {
    console.error("❌ Email sending error:", error);
    throw new Error("Email could not be sent");
  }
};
