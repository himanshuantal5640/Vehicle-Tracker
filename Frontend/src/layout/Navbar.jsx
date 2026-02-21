import React from "react"
import { useNavigate } from "react-router-dom"

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center px-10 py-6 border-b border-gray-800 bg-[#060B16] text-white">
      
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Fleet<span className="text-cyan-400">Pulse</span>
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-6 py-2 bg-cyan-400 text-black rounded-lg font-semibold hover:bg-cyan-300 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}