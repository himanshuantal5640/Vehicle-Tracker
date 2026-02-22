import { useState } from "react";
import { bookTrip } from "../services/tripService";
import toast from "react-hot-toast";

export default function BookTrip() {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await bookTrip({
      tripId: form.tripId,
      driverName: form.driverName,
      vehicleId: form.vehicleId,
      source: {
        lat: Number(form.sourceLat),
        lng: Number(form.sourceLng),
      },
      destination: {
        lat: Number(form.destLat),
        lng: Number(form.destLng),
      },
    });

    toast.success("Trip Booked Successfully");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Trip</h2>

      <input name="tripId" placeholder="Trip ID" onChange={handleChange} /><br />
      <input name="driverName" placeholder="Driver Name" onChange={handleChange} /><br />
      <input name="vehicleId" placeholder="Vehicle ID" onChange={handleChange} /><br />

      <h4>Source</h4>
      <input name="sourceLat" placeholder="Lat" onChange={handleChange} /><br />
      <input name="sourceLng" placeholder="Lng" onChange={handleChange} /><br />

      <h4>Destination</h4>
      <input name="destLat" placeholder="Lat" onChange={handleChange} /><br />
      <input name="destLng" placeholder="Lng" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Book Trip</button>
    </div>
  );
}