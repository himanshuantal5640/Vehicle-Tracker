import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();   // Load env here directly
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
     from: `"Vehicle Live Tracker" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Vehicle Live Tracker - OTP Verification",
    text: `
Hello,

Welcome to Vehicle Live Tracker.

Your One-Time Password (OTP) for verification is:

   ${otp}

This OTP is valid for 5 minutes.
For security reasons, please do not share this code with anyone.

If you did not request this verification, please ignore this email.

Stay safe and drive smart 🚗

— Vehicle Live Tracker Team
`
  });
};
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);