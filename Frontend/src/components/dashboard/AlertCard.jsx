import React from "react"

export default function AlertCard({ alert }) {
  return (
    <div className="bg-[#0F1629] p-4 rounded-xl border border-orange-500 mb-4">
      <h4 className="text-orange-400 font-semibold">
        {alert.type}
      </h4>
      <p className="text-gray-400 text-sm mt-1">
        {alert.message}
      </p>
      <p className="text-gray-500 text-xs mt-2">
        {new Date(alert.createdAt).toLocaleTimeString()}
      </p>
    </div>
  )
}