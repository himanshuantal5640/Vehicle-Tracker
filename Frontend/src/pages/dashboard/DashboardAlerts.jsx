import React from "react"
import { useAlertStore } from "../../store/alertStore"

export default function DashboardAlerts() {
  const alerts = useAlertStore((state) => state.alerts)

  if (!alerts.length) {
    return (
      <div className="text-gray-400 text-sm">
        No alerts yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.slice().reverse().map((alert, index) => (
        <div
          key={index}
          className="bg-[#111827] p-4 rounded-xl border border-red-600"
        >
          <p className="text-red-400 font-semibold">
            {alert.type || "Alert"}
          </p>

          <p className="text-gray-300 text-sm mt-1">
            {alert.message}
          </p>

          <p className="text-gray-500 text-xs mt-2">
            {new Date(alert.createdAt || Date.now()).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  )
}