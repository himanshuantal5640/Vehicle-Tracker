

import React from "react"
import { useVehicleStore } from "../../store/vehicleStore"

export default function StatsCards() {
  const vehicles = useVehicleStore((state) => state.vehicles)

  const total = vehicles.length
  const active = vehicles.filter(v => v.status === "active").length
  const delayed = vehicles.filter(v => v.status === "delayed").length

  return (
    <div className="grid grid-cols-3 gap-6">

      <div className="bg-[#0F1629] p-6 rounded-xl border border-gray-800">
        <p className="text-gray-400">Total</p>
        <h2 className="text-2xl text-white mt-2">{total}</h2>
      </div>

      <div className="bg-[#0F1629] p-6 rounded-xl border border-green-500">
        <p className="text-gray-400">Active</p>
        <h2 className="text-2xl text-green-400 mt-2">{active}</h2>
      </div>

      <div className="bg-[#0F1629] p-6 rounded-xl border border-orange-500">
        <p className="text-gray-400">Delayed</p>
        <h2 className="text-2xl text-orange-400 mt-2">{delayed}</h2>
      </div>

    </div>
  )
}