import { useEffect, useState } from "react";
import { getTrips } from "../services/tripService";
import MapView from "../components/MapView";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await getTrips();
    setTrips(res.data);
  };

  return (
    <div style={{ display: "flex" }}>
      
      <div style={{ width: "30%", padding: "20px" }}>
        <h3>All Trips</h3>
        {trips.map((trip) => (
          <div
            key={trip._id}
            onClick={() => setSelectedTrip(trip)}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <p><b>{trip.tripId}</b></p>
            <p>{trip.driverName}</p>
            <p>Status: {trip.status}</p>
          </div>
        ))}
      </div>

      <div style={{ width: "70%" }}>
        <MapView trip={selectedTrip} />
      </div>
    </div>
  );
}