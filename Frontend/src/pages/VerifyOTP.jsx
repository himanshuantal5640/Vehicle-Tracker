


import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import api from "../services/api"

export default function VerifyOtp() {
  const navigate = useNavigate()
  const email = localStorage.getItem("otpEmail")

  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(60)
  const [verified, setVerified] = useState(false)

  const inputsRef = useRef([])

  
  useEffect(() => {
    if (!email) {
      navigate("/register")
    }
  }, []) 

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [timer])

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handleVerify = async () => {
    const finalOtp = otp.join("")

    if (finalOtp.length !== 6) {
      toast.error("Enter complete 6 digit OTP")
      return
    }

    try {
      setLoading(true)

      await api.post("/auth/verify-otp", {
        email,
        otp: finalOtp,
      })

      toast.success("OTP Verified Successfully")

      setVerified(true)  

      localStorage.removeItem("otpEmail")

      navigate("/login")

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid or expired OTP"
      )
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await api.post("/auth/resend-otp", { email })
      toast.success("OTP resent successfully")
      setTimer(60)
    } catch (err) {
      toast.error("Failed to resend OTP")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B16] text-white">
      <div className="bg-[#0F1629] p-10 rounded-2xl w-[420px] border border-gray-800">

        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              className="w-12 h-14 text-center text-xl rounded-lg bg-[#060B16] border border-gray-700 focus:border-cyan-400 focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full py-3 bg-cyan-400 text-black rounded-lg font-semibold hover:bg-cyan-300 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <div className="text-center mt-6 text-sm">
          {timer > 0 ? (
            <p className="text-gray-400">
              Resend OTP in{" "}
              <span className="text-cyan-400 font-semibold">
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-cyan-400 hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>

      </div>
    </div>
  )
}