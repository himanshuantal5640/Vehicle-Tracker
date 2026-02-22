import React, { useCallback } from "react";
import NavbarAuth from "../../layout/NavbarAuth";
import MapSection from "../../components/dashboard/MapSection";
import StatsCards from "../../components/dashboard/StatsCards";
import DriverList from "../../components/dashboard/DriverList";
import useSocket from "../../hooks/useSocket";
import { useVehicleStore } from "../../store/vehicleStore";
import { useAlertStore } from "../../store/alertStore";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const setVehicles = useVehicleStore((state) => state.setVehicles);
  const addAlert = useAlertStore((state) => state.addAlert);

  const handleSocketMessage = useCallback(
    (data) => {
      if (data.type === "VEHICLE_UPDATE") {
        setVehicles(data.vehicles);
      }

      if (data.type === "ALERT") {
        addAlert(data.payload || data.alert);
        toast.error((data.payload || data.alert)?.message);
      }
    },
    [setVehicles, addAlert]
  );

  useSocket(handleSocketMessage);

  return (
    <div className="h-screen flex flex-col bg-[#060B16]">
      <NavbarAuth />

      <div className="flex-1 flex overflow-hidden">

        {/* Sidebar - Driver List */}
        <div className="w-80 bg-[#0F1629] border-r border-gray-800 p-5 overflow-y-auto">
          <h2 className="text-white text-lg font-semibold mb-4">
            Fleet Routes
          </h2>

          <DriverList />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 flex flex-col">
          <StatsCards />

          <div className="flex-1 mt-6 rounded-xl overflow-hidden border border-gray-800">
            <MapSection />
          </div>
        </div>

      </div>
    </div>
  );
}