import React from "react"
import Container from "../components/Container"

export default function CTA() {
  return (
    <section className="py-32 text-center">
      <Container>
        <h2 className="text-6xl font-bold">
          Your fleet deserves <br />
          <span className="text-cyan-400">
            real-time clarity
          </span>
        </h2>

        <div className="mt-10 flex justify-center gap-6">
          <button className="px-10 py-4 bg-cyan-400 text-black rounded-xl font-semibold">
            CREATE FREE ACCOUNT →
          </button>
          <button className="px-10 py-4 border rounded-xl">
            Sign In
          </button>
        </div>
      </Container>
    </section>
  )
}