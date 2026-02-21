import React from "react"
import Container from "../components/Container"

export default function Footer() {
  return (
    <footer className="py-16 border-t dark:border-gray-800 border-gray-200">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-bold mb-4">
              FLEET<span className="text-cyan-400">PULSE</span>
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Live vehicle intelligence for modern logistics operations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Product</h4>
            <p>Features</p>
            <p>How It Works</p>
            <p>Stats</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Account</h4>
            <p>Login</p>
            <p>Register</p>
            <p>Verify OTP</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tech Stack</h4>
            <p>React + Vite</p>
            <p>Mapbox GL JS</p>
            <p>Zustand</p>
            <p>Node + MongoDB</p>
          </div>
        </div>

        <p className="mt-12 text-xs text-gray-500">
          © 2026 FleetPulse. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}