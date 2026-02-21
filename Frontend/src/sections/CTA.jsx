// import React from "react"
// import Container from "../components/Container"
// import { useNavigate } from "react-router-dom"

// export default function CTA() {
//   const navigate = useNavigate();
//   return (
//     <section className="py-32 text-center">
//       <Container>
//         <h2 className="text-6xl font-bold">
//           Your fleet deserves <br />
//           <span className="text-cyan-400">
//             real-time clarity
//           </span>
//         </h2>

//         <div className="mt-10 flex justify-center gap-6">
//           <button onClick={() => navigate("/register")} className="px-10 py-4 bg-cyan-400 text-black rounded-xl font-semibold">
//             CREATE FREE ACCOUNT →
//           </button>
//           <button onClick={() => navigate("/login")} className="px-10 py-4 border rounded-xl">
//             Sign In
//           </button>
//         </div>
//       </Container>
//     </section>
//   )
// }

import React from "react"
import { useNavigate } from "react-router-dom"

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="py-24 bg-[#060B16] text-center text-white">
      <h2 className="text-4xl font-bold">
        Your fleet deserves real-time clarity
      </h2>

      <p className="text-gray-400 mt-4">
        Join 500+ fleets already running on FleetPulse.
      </p>

      <div className="mt-10 flex justify-center gap-6">
        <button
          onClick={() => navigate("/register")}
          className="px-8 py-3 bg-cyan-400 text-black rounded-xl font-semibold hover:bg-cyan-300 transition"
        >
          Create Free Account →
        </button>

        <button
          onClick={() => navigate("/login")}
          className="px-8 py-3 border border-gray-600 rounded-xl hover:bg-gray-800 transition"
        >
          Sign In
        </button>
      </div>
    </section>
  )
}