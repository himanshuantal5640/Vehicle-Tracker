import React, { useEffect } from "react"
import Sidebar from "../../components/dashboard/Sidebar"
import { useAlertStore } from "../../store/alertStore"
import api from "../../services/api"
import toast from "react-hot-toast"

export default function DashboardAlerts() {
  const alerts = useAlertStore((state) => state.alerts)
  const setAlerts = useAlertStore((state) => state.setAlerts)

  useEffect(() => {
    api.get("/alerts")
      .then((res) => setAlerts(res.data))
      .catch(() => toast.error("Failed to fetch alerts"))
  }, [])

  return (
    <div className="flex h-screen bg-[#060B16]">
      <Sidebar />

      <div className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-2xl text-white mb-6">Alerts</h2>

        {alerts.map((alert) => (
          <div
            key={alert._id}
            className="bg-[#0F1629] p-4 rounded-lg mb-4 border border-orange-500"
          >
            <p className="text-orange-400">{alert.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}