import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import OTP from "../models/OTP.js";
import { sendOTPEmail } from "../config/mail.js";
import { validatePassword } from "../utils/passwordValidator.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ message: passwordError });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    const otp = crypto.randomInt(100000, 999999).toString();

    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    });

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent to email" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const getProfile = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decoded.id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json(user)

  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp });

  if (!otpRecord || otpRecord.expiresAt < new Date())
    return res.status(400).json({ message: "Invalid or expired OTP" });

  await User.updateOne({ email }, { isVerified: true });
  await OTP.deleteMany({ email });

  res.json({ message: "Account verified" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.isVerified)
    return res.status(400).json({ message: "Invalid credentials or not verified" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2d"
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 2 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
  });
  // res.json({
  //   message: "Login successful",
  //   token,
  // });

  res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Delete old OTPs
    await OTP.deleteMany({ email })

    const newOTP = crypto.randomInt(100000, 999999).toString()

    await OTP.create({
      email,
      otp: newOTP,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    await sendOTPEmail(email, newOTP)

    res.json({ message: "OTP resent successfully" })

  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}