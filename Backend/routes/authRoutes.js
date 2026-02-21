import express from "express";
import { register, verifyOTP, login, logout, resendOTP, getProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);
router.post("/logout", logout);
router.post("/resend-otp", resendOTP);
router.get("/profile", getProfile);

export default router;