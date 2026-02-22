import React, { useCallback, useEffect, useState } from "react";
import NavbarAuth from "../../layout/NavbarAuth";
import MapSection from "../../components/dashboard/MapSection";
import StatsCards from "../../components/dashboard/StatsCards";
import DriverList from "../../components/dashboard/DriverList";
import TripForm from "../../components/trips/TripForm";
import TripTable from "../../components/trips/TripTable";
import DashboardAlerts from "./DashboardAlerts";

import useSocket from "../../hooks/useSocket";
import { useVehicleStore } from "../../store/vehicleStore";
import { useAlertStore } from "../../store/alertStore";
import { getTrips } from "../../services/tripService";
import toast from "react-hot-toast";

export default function DashboardHome() {
  const [showTripModal, setShowTripModal] = useState(false);
  const [showTrips, setShowTrips] = useState(false);
  const [trips, setTrips] = useState([]);

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

  // Fetch Trips
  const fetchTrips = async () => {
    try {
      const data = await getTrips();
      setTrips(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (showTrips) {
      fetchTrips();
    }
  }, [showTrips]);

  return (
    <div className="h-screen flex flex-col bg-[#060B16]">
      <NavbarAuth />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-[#0F1629] border-r border-gray-800 p-5">
          <h2 className="text-white text-lg font-semibold mb-4">
            Fleet Routes
          </h2>
          <DriverList />
        </div>

        {/* Main */}
        <div className="flex-1 p-6 flex flex-col">
          <div className="flex justify-between items-center">
            <StatsCards />

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowTripModal(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded-lg"
              >
                + Book Trip
              </button>

              <button
                onClick={() => setShowTrips(!showTrips)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                {showTrips ? "Hide Trips" : "View Trips"}
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 mt-6 rounded-xl overflow-hidden border border-gray-800">
            <MapSection />
          </div>

          {/* Trip Section */}
          {showTrips && (
            <div className="mt-6">
              {trips.length === 0 ? (
                <div className="text-center text-gray-400 py-6">
                  No trip planned
                </div>
              ) : (
                <TripTable trips={trips} />
              )}
            </div>
          )}
        </div>

        {/* Alerts */}
        <div className="w-80 bg-[#0F1629] border-l border-gray-800 p-5">
          <h2 className="text-white text-lg font-semibold mb-4">
            Live Alerts
          </h2>
          <DashboardAlerts />
        </div>
      </div>

      {/* Trip Modal */}
      {showTripModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[520px] bg-[#0F1629] rounded-2xl border border-gray-800 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowTripModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h2 className="text-white text-xl font-semibold mb-6">
              Book New Trip
            </h2>

            <TripForm
              onSuccess={() => {
                setShowTripModal(false);
                setShowTrips(true);
                fetchTrips();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}