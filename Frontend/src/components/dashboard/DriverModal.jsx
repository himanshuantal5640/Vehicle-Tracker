import React from "react"
import { useVehicleStore } from "../../store/vehicleStore"
import { useAlertStore } from "../../store/alertStore"

export default function DriverModal({ onClose }) {
  const vehicle = useVehicleStore((s) => s.selectedVehicle)
  const alerts = useAlertStore((s) => s.alerts)

  if (!vehicle) return null

  const lastAlert = alerts.find(a => a.vehicleId === vehicle._id)

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#0F1629] p-6 rounded-xl w-96">
        <h2 className="text-white text-xl mb-4">
          {vehicle.driverName}
        </h2>

        <p className="text-gray-400">Speed: {vehicle.speed} km/h</p>
        <p className="text-gray-400">Status: {vehicle.status}</p>
        <p className="text-gray-400">
          Last Alert: {lastAlert?.message || "No alerts"}
        </p>

        <button
          onClick={onClose}
          className="mt-4 bg-cyan-500 px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  )
}