import React from "react";
import Container from "../components/Container";

const features = [
  {
    title: "Live WebSocket Stream",
    desc: "Vehicles push updates every second via persistent WebSocket connections.",
  },
  {
    title: "Geofence Zones",
    desc: "Define custom geographic boundaries with instant alerts.",
  },
  {
    title: "Smart Alert System",
    desc: "Alerts fire instantly when events occur.",
  },
  {
    title: "Mapbox Dark Maps",
    desc: "Smooth dark theme maps with clustering support.",
  },
  {
    title: "Fleet Analytics",
    desc: "Track active trips and delayed routes.",
  },
  {
    title: "Secure Auth + OTP",
    desc: "JWT authentication with cookie sessions.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24">
      <Container>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl border border-gray-200 dark:border-gray-800 
  bg-white/70 dark:bg-[#0F1629]/70 
  backdrop-blur-xl
  hover:scale-105 transition duration-300
  shadow-lg hover:shadow-cyan-500/10"
            >
              <h3 className="text-xl font-semibold mb-4">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
