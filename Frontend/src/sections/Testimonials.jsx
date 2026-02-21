import React from "react"
import Container from "../components/Container"

const testimonials = [
  {
    name: "Rahul Kapoor",
    role: "Head of Logistics • BlueDart",
    text: "FleetPulse cut our incident response time by 60%. The geofence alerts are instant — we know before the driver even calls."
  },
  {
    name: "Sneha Joshi",
    role: "CTO • Zephyr Logistics",
    text: "The live map is stunning. Clients can see their cargo moving in real time. That transparency helped us win three new contracts."
  },
  {
    name: "Aryan Mehta",
    role: "Lead Engineer • QuickShip",
    text: "Setup took one afternoon. WebSocket integration is clean, modular, and the dark UI feels premium."
  }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-32 relative">
      <Container>
        <p className="text-cyan-400 uppercase tracking-widest text-sm mb-6">
          TESTIMONIALS
        </p>

        <h2 className="text-5xl font-bold mb-16">
          Trusted by ops teams <br />
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            who can't afford downtime
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl bg-white/70 dark:bg-[#0F1629]/70 
              backdrop-blur-xl border border-gray-200 dark:border-gray-800
              hover:scale-105 transition duration-300"
            >
              <div className="text-yellow-400 mb-4">★★★★★</div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t.text}
              </p>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}