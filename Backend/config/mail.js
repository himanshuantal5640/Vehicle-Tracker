import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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

Your OTP is: ${otp}

This OTP is valid for 5 minutes.
Do not share it with anyone.

— Vehicle Live Tracker Team
`,

    // HTML version (Styled)
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 500px; margin: auto; background: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
          
          <h2 style="text-align: center; color: #1f2937;">
            🚗 Vehicle Live Tracker
          </h2>

          <p style="color: #374151; font-size: 16px;">
            Hello,
          </p>

          <p style="color: #374151; font-size: 16px;">
            Welcome to <strong>Vehicle Live Tracker</strong>.
            Please use the OTP below to verify your account:
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <span style="
              display: inline-block;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 5px;
              color: #16a34a;
              background: #dcfce7;
              padding: 15px 25px;
              border-radius: 8px;
            ">
              ${otp}
            </span>
          </div>

          <p style="color: #374151; font-size: 14px;">
            ⏳ This OTP is valid for <strong>5 minutes</strong>.
          </p>

          <p style="color: #6b7280; font-size: 13px; margin-top: 20px;">
            For security reasons, do not share this code with anyone.
            If you did not request this verification, you can safely ignore this email.
          </p>

          <hr style="margin: 25px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="text-align: center; color: #9ca3af; font-size: 12px;">
            Stay safe and drive smart 🚗 <br/>
            — Vehicle Live Tracker Team
          </p>

        </div>
      </div>
    `
  });
};