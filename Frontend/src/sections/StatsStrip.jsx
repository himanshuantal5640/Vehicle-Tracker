import React from "react"
import Container from "../components/Container"

export default function StatsStrip() {
  const items = [
    "DRIVER INSIGHTS",
    "MONGODB STORAGE",
    "ROUTE PLAYBACK",
    "REAL-TIME TRACKING",
    "GEOFENCE DETECTION",
    "WEBSOCKET STREAM"
  ]

  return (
    <div className="border-y dark:border-gray-800 border-gray-200 py-4 text-xs tracking-widest">
      <Container>
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item, i) => (
            <span key={i} className="text-gray-500 dark:text-gray-400">
              • {item}
            </span>
          ))}
        </div>
      </Container>
    </div>
  )
}