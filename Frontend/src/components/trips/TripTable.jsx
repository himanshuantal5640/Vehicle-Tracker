import { useVehicleStore } from "../../store/vehicleStore";
import {
  startTrip,
  completeTrip,
} from "../../services/tripService";
import { useState } from "react";

export default function TripTable({ trips }) {
  const setSelectedTrip = useVehicleStore(
    (state) => state.setSelectedTrip
  );

  const [loadingId, setLoadingId] = useState(null);

  const getStatusColor = (status) => {
    if (status === "planned") return "text-cyan-400";
    if (status === "in-progress") return "text-lime-400";
    if (status === "completed") return "text-gray-400";
    return "text-gray-400";
  };

  const handleStart = async (e, trip) => {
    e.stopPropagation();
    setLoadingId(trip._id);
    const res = await startTrip(trip._id);
    setSelectedTrip(res.data);
    setLoadingId(null);
  };

  const handleComplete = async (e, trip) => {
    e.stopPropagation();
    setLoadingId(trip._id);
    const res = await completeTrip(trip._id);
    setSelectedTrip(res.data);
    setLoadingId(null);
  };

  return (
    <div className="bg-[#0F1629] border border-gray-800 rounded-xl overflow-hidden">
      
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-white text-lg font-semibold">
          Trip Management
        </h2>
      </div>

      <div className="overflow-y-auto max-h-[450px]">
        <table className="w-full text-sm text-left text-gray-300">
          
          <thead className="bg-[#060B16] text-gray-400 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Trip ID</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip._id}
                onClick={() => setSelectedTrip(trip)}
                className="border-b border-gray-800 hover:bg-[#1A2238] cursor-pointer transition"
              >
                <td className="px-4 py-3 text-white font-medium">
                  {trip.tripId}
                </td>

                <td className="px-4 py-3">
                  {trip.sourceName}
                </td>

                <td className="px-4 py-3">
                  {trip.destinationName}
                </td>

                <td
                  className={`px-4 py-3 font-semibold ${getStatusColor(
                    trip.status
                  )}`}
                >
                  {trip.status}
                </td>

                <td className="px-4 py-3 text-center">
                  {trip.status === "planned" && (
                    <button
                      onClick={(e) => handleStart(e, trip)}
                      disabled={loadingId === trip._id}
                      className="bg-lime-500 hover:bg-lime-600 text-black px-3 py-1 rounded text-xs font-semibold"
                    >
                      Start
                    </button>
                  )}

                  {trip.status === "in-progress" && (
                    <button
                      onClick={(e) => handleComplete(e, trip)}
                      disabled={loadingId === trip._id}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs font-semibold"
                    >
                      Complete
                    </button>
                  )}

                  {trip.status === "completed" && (
                    <span className="text-gray-500 text-xs">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {trips.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No trips created yet.
          </div>
        )}
      </div>
    </div>
  );
}