// import React, { useEffect } from "react"
// import Sidebar from "../../components/dashboard/Sidebar"
// import { useAlertStore } from "../../store/alertStore"
// import api from "../../services/api"
// import toast from "react-hot-toast"

// export default function DashboardAlerts() {
//   const alerts = useAlertStore((state) => state.alerts)
//   const setAlerts = useAlertStore((state) => state.setAlerts)

//   useEffect(() => {
//     api.get("/alerts")
//       .then((res) => setAlerts(res.data))
//       .catch(() => toast.error("Failed to fetch alerts"))
//   }, [])

//   return (
//     <div className="flex h-screen bg-[#060B16]">
//       <Sidebar />

//       <div className="flex-1 p-10 overflow-y-auto">
//         <h2 className="text-2xl text-white mb-6">Alerts</h2>

//         {alerts.map((alert) => (
//           <div
//             key={alert._id}
//             className="bg-[#0F1629] p-4 rounded-lg mb-4 border border-orange-500"
//           >
//             <p className="text-orange-400">{alert.message}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }


import React from "react"
import { useAlertStore } from "../../store/alertStore"

export default function DashboardAlerts() {
  const alerts = useAlertStore((state) => state.alerts)

  if (!alerts.length) {
    return (
      <div className="text-gray-400 text-sm">
        No alerts yet.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {alerts.slice().reverse().map((alert, index) => (
        <div
          key={index}
          className="bg-[#111827] p-4 rounded-xl border border-red-600"
        >
          <p className="text-red-400 font-semibold">
            {alert.type || "Alert"}
          </p>

          <p className="text-gray-300 text-sm mt-1">
            {alert.message}
          </p>

          <p className="text-gray-500 text-xs mt-2">
            {new Date(alert.createdAt || Date.now()).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  )
}