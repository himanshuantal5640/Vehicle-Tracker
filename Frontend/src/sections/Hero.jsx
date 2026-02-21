import React from "react"
import Container from "../components/Container"

export default function Hero() {
  return (
    <section className="pt-36 pb-24 relative">
      <Container>
        <p className="text-cyan-400 tracking-widest uppercase text-sm mb-6">
          CORE FEATURES
        </p>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Everything your fleet <br />
          <span className="text-cyan-400">
            needs to move smarter
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-gray-600 dark:text-gray-400 text-lg">
          From real-time location updates to intelligent geofence zones —
          FleetPulse gives your operations team the clarity to act fast.
        </p>
      </Container>
    </section>
  )
}