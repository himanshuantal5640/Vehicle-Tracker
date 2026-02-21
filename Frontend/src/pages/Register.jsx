import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import PasswordInput from "../components/PasswordInput";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await registerUser({ name, email, password });

      // ✅ Store email for OTP verification
      localStorage.setItem("otpEmail", email);

      toast.success("OTP sent to email");
      navigate("/verify-otp");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B16]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0F1629] p-8 rounded-2xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-white text-center">
          Create Account
        </h2>

        <input
          placeholder="Full Name"
          className="w-full p-3 bg-[#060B16] border border-gray-700 rounded-lg text-white"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-[#060B16] border border-gray-700 rounded-lg text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 text-black p-3 rounded-lg flex justify-center"
        >
          {loading ? <LoadingSpinner /> : "Create Account"}
        </button>
      </form>
    </div>
  );
}
