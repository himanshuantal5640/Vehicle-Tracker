import React from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts"
import { useVehicleStore } from "../../store/vehicleStore"

export default function Analytics() {
  const vehicles = useVehicleStore((s) => s.vehicles)

  const data = vehicles.map(v => ({
    name: v.driverName,
    speed: v.speed,
  }))

  return (
    <div className="p-6">
      <h2 className="text-white text-xl mb-4">Driver Speed Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="speed" fill="#22d3ee" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}