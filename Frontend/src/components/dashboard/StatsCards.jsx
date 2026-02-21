import React from "react"
import { useVehicleStore } from "../../store/vehicleStore"

export default function StatsCards() {
  const vehicles = useVehicleStore((state) => state.vehicles)

  const total = vehicles.length
  const active = vehicles.filter(v => v.status === "ACTIVE").length
  const delayed = vehicles.filter(v => v.status === "DELAYED").length

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-[#0F1629] p-4 rounded-xl border border-gray-700">
        <p className="text-gray-400 text-sm">Total</p>
        <h2 className="text-2xl text-white">{total}</h2>
      </div>

      <div className="bg-[#0F1629] p-4 rounded-xl border border-green-600">
        <p className="text-gray-400 text-sm">Active</p>
        <h2 className="text-2xl text-green-400">{active}</h2>
      </div>

      <div className="bg-[#0F1629] p-4 rounded-xl border border-orange-600">
        <p className="text-gray-400 text-sm">Delayed</p>
        <h2 className="text-2xl text-orange-400">{delayed}</h2>
      </div>
    </div>
  )
}