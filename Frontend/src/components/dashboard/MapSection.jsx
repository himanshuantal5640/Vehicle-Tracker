import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { useVehicleStore } from "../../store/vehicleStore";
import L from "leaflet"
import "leaflet/dist/leaflet.css"
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function MapSection() {
  const vehicles = useVehicleStore((state) => state.vehicles);

  return (
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Geofence Circle */}
      <Circle
        center={[12.9716, 77.5946]}
        radius={2000}
        pathOptions={{ color: "cyan" }}
      />

      {vehicles.map((vehicle) => (
  <Marker
    key={vehicle.id + vehicle.lat + vehicle.lng}  
    position={[vehicle.lat, vehicle.lng]}
  >
    <Popup>
  <div>
    <strong>{vehicle.driverName}</strong>
    <br />
    {vehicle.vehicleNumber}
    <br />
    Status: {vehicle.status}
  </div>
</Popup>
  </Marker>
))}

    </MapContainer>
  );
}

