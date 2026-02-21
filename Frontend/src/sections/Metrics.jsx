import React from "react"
import { useEffect, useState } from "react"
import Container from "../components/Container"

function Counter({ target }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1500
    const stepTime = Math.abs(Math.floor(duration / target))

    const timer = setInterval(() => {
      start += Math.ceil(target / 50)
      if (start >= target) {
        start = target
        clearInterval(timer)
      }
      setCount(start)
    }, stepTime)

    return () => clearInterval(timer)
  }, [target])

  return <span>{count}</span>
}

export default function Metrics() {
  return (
    <section id="stats" className="py-28">
      <Container>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold text-cyan-400">
              <Counter target={500} />+
            </h3>
            <p className="mt-2 text-gray-500">Active Fleets</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-cyan-400">
              <Counter target={12} />M+
            </h3>
            <p className="mt-2 text-gray-500">Location Events / Day</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-cyan-400">
              99.9%
            </h3>
            <p className="mt-2 text-gray-500">Platform Uptime</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-cyan-400">
              &lt;80ms
            </h3>
            <p className="mt-2 text-gray-500">Avg Alert Latency</p>
          </div>
        </div>
      </Container>
    </section>
  )
}