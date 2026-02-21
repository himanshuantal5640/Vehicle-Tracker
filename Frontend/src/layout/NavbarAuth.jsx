import React from "react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../services/authService"
import { useAuthStore } from "../store/authStore"
import toast from "react-hot-toast"

export default function NavbarAuth() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearUser = useAuthStore((state) => state.clearUser)

  const handleLogout = async () => {
    try {
      await logoutUser()
      clearUser()
      toast.success("Logged out successfully")
      navigate("/")
    } catch {
      toast.error("Logout failed")
    }
  }

  return (
    <div className="flex justify-between items-center bg-[#0F1629] px-8 py-4 border-b border-gray-700">
      <h1 className="text-white font-bold text-xl">
        FleetPulse Dashboard
      </h1>

      <div className="flex items-center gap-6">
        <span className="text-gray-400">
          {user?.name || user?.email}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded-lg text-white"
        >
          Logout
        </button>
      </div>
    </div>
  )
}