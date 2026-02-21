import React, { useEffect } from "react"
import NavbarAuth from "../../layout/NavbarAuth"
import MapSection from "../../components/dashboard/MapSection"
import StatsCards from "../../components/dashboard/StatsCards"
import useSocket from "../../hooks/useSocket"
import { useVehicleStore } from "../../store/vehicleStore"
import { useAlertStore } from "../../store/alertStore"
import { getTrips } from "../../services/tripService"
import toast from "react-hot-toast"

export default function DashboardHome() {
  const setVehicles = useVehicleStore((state) => state.setVehicles)
  const updateVehicle = useVehicleStore((state) => state.updateVehicle)
  const addAlert = useAlertStore((state) => state.addAlert)

  useEffect(() => {
    getTrips()
      .then((data) => setVehicles(data))
      .catch(() => toast.error("Failed to fetch trips"))
  }, [])

  useSocket((data) => {
    if (data.type === "VEHICLE_UPDATE") {
      updateVehicle(data.payload)
    }

    if (data.type === "ALERT") {
      addAlert(data.payload)
      toast.error(data.payload.message)
    }
  })

  return (
    <div className="h-screen flex flex-col bg-[#060B16]">
      <NavbarAuth />

      <div className="flex-1 p-6">
        <StatsCards />
        <div className="h-[500px] mt-6 rounded-xl overflow-hidden">
          <MapSection />
        </div>
      </div>
    </div>
  )
}