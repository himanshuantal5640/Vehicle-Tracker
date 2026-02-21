import React from "react"
import Container from "../components/Container"

export default function HowItWorks() {
  const steps = [
    "Register & Verify",
    "Connect Vehicles",
    "Set Geofence Zones",
    "Monitor Live"
  ]

  return (
    <section id="how" className="py-24">
      <Container>
        <h2 className="text-5xl font-bold mb-16">
          Up and running <br />
          <span className="text-cyan-400">in four steps</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-10 text-center">
          {steps.map((s, i) => (
            <div key={i}>
              <div className="w-14 h-14 mx-auto mb-4 rounded-full border flex items-center justify-center">
                {i + 1}
              </div>
              <p>{s}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}