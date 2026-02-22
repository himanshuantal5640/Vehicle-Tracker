

import React from "react";
import { useVehicleStore } from "../../store/vehicleStore";

export default function DriverList() {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const selectedVehicle = useVehicleStore((state) => state.selectedVehicle);
  const setSelectedVehicle = useVehicleStore(
    (state) => state.setSelectedVehicle,
  );

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => {
        const isSelected = selectedVehicle?._id === vehicle._id;

        return (
          <div
            key={vehicle._id}
            onClick={() => setSelectedVehicle(vehicle)}
            className={`cursor-pointer p-4 rounded-xl border transition
              ${
                isSelected
                  ? "border-cyan-400 bg-[#111f2f]"
                  : "border-gray-700 bg-[#111827] hover:border-cyan-500"
              }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-white font-semibold">{vehicle.driverName}</p>
                <p className="text-gray-400 text-sm">{vehicle.vehicleNumber}</p>
              </div>

              <span
                className={`px-2 py-1 rounded text-xs ${
                  vehicle.speed < 40
                    ? "bg-green-600"
                    : vehicle.speed < 70
                      ? "bg-orange-500"
                      : vehicle.speed == 0 ? "bg-red-900":"bg-gray-600"
                }`}
              >
                {vehicle.speed} km/h
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
