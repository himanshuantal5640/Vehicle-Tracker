import React from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useVehicleStore } from "../../store/vehicleStore"

export default function Charts() {
  const vehicles = useVehicleStore(s => s.vehicles)

  const data = vehicles.map(v => ({
    name: v.driver?.name,
    speed: v.speed
  }))

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="speed" fill="#22d3ee" />
      </BarChart>
    </ResponsiveContainer>
  )
}