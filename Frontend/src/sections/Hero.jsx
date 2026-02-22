

import Container from "../components/Container"

export default function Hero() {
  return (
    <section className="pt-40 pb-32 relative overflow-hidden">
      
      {/* Glow lighting */}
      <div className="glow-blob top-20 left-1/2 -translate-x-1/2"></div>

      <Container>
        <p className="text-cyan-400 tracking-widest uppercase text-sm mb-6">
          CORE FEATURES
        </p>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Everything your fleet <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
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