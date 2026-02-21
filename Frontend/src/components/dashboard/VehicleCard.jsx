import React from "react"

export default function VehicleCard({ vehicle }) {
  return (
    <div className="bg-[#0F1629] p-4 rounded-xl border border-gray-700 mb-4">
      <h3 className="text-white font-semibold">{vehicle.driverName}</h3>
      <p className="text-gray-400 text-sm">ID: {vehicle._id}</p>

      <div className="mt-2 flex justify-between">
        <span
          className={`text-xs px-2 py-1 rounded ${
            vehicle.status === "ACTIVE"
              ? "bg-green-600 text-white"
              : "bg-orange-600 text-white"
          }`}
        >
          {vehicle.status}
        </span>

        <span className="text-gray-400 text-xs">
          {vehicle.speed} km/h
        </span>
      </div>
    </div>
  )
}