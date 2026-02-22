import React from "react";
import { useVehicleStore } from "../../store/vehicleStore";

export default function DriverList() {
  const vehicles = useVehicleStore((state) => state.vehicles);

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => (
        <div
          key={vehicle._id}
          className="bg-[#111827] p-4 rounded-xl border border-gray-700 hover:border-cyan-500 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">
                {vehicle.driverName}
              </p>
              <p className="text-gray-400 text-sm">
                {vehicle.vehicleNumber}
              </p>
            </div>

            <span
              className={`px-3 py-1 text-xs rounded-full ${
                vehicle.status === "active"
                  ? "bg-green-600"
                  : vehicle.status === "delayed"
                  ? "bg-orange-600"
                  : "bg-gray-600"
              }`}
            >
              {vehicle.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}