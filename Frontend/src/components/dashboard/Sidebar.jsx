import React from "react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/authService"
import { useAuthStore } from "../../store/authStore"
import toast from "react-hot-toast"

export default function Sidebar() {
  const navigate = useNavigate()
  const clearUser = useAuthStore((state) => state.clearUser)

  const handleLogout = async () => {
    await logoutUser()
    clearUser()
    toast.success("Logged out successfully")
    navigate("/")
  }

  return (
    <div className="w-72 bg-[#0F1629] p-6 space-y-6">
      <h2 className="text-xl font-bold text-white">FleetPulse</h2>

      <button
        onClick={() => navigate("/dashboard")}
        className="block text-left text-gray-300"
      >
        Dashboard
      </button>

      <button
        onClick={() => navigate("/dashboard/alerts")}
        className="block text-left text-gray-300"
      >
        Alerts
      </button>

      <button
        onClick={handleLogout}
        className="text-red-400 mt-6"
      >
        Logout
      </button>
    </div>
  )
}