import React from "react"
import Container from "../components/Container"
import ThemeToggle from "../components/ThemeToggle"

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-white/70 dark:bg-[#060B16]/70 border-b border-gray-200 dark:border-gray-800">
      <Container>
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold tracking-wider">
            <span>FLEET</span>
            <span className="text-cyan-400">PULSE</span>
          </h1>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#features">Features</a>
            <a href="#how">How It Works</a>
            <a href="#stats">Stats</a>
            <a href="#testimonials">Testimonials</a>
          </div>

          <div className="flex gap-4 items-center">
            <ThemeToggle />
            <button className="px-6 py-2 rounded-lg border dark:border-gray-700">
              Log In
            </button>
            <button className="px-6 py-2 rounded-lg bg-cyan-400 text-black font-semibold">
              GET STARTED →
            </button>
          </div>
        </div>
      </Container>
    </nav>
  )
}