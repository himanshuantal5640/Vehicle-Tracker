import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../services/authService"
import LoadingSpinner from "../components/LoadingSpinner"
import PasswordInput from "../components/PasswordInput"
import toast from "react-hot-toast"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await loginUser({ email, password })
      toast.success("Login successful")
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060B16]">
      <form onSubmit={handleSubmit} className="bg-[#0F1629] p-8 rounded-2xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 bg-[#060B16] border border-gray-700 rounded-lg text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 text-black p-3 rounded-lg flex justify-center"
        >
          {loading ? <LoadingSpinner /> : "Sign In"}
        </button>
        <div className="text-center text-gray-400 text-sm">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-cyan-400 cursor-pointer hover:underline"
        >
          Create Account
        </span>
      </div>
      </form>
    </div>
  )
}