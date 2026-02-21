import React from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import { useVehicleStore } from "../../store/vehicleStore"

export default function MapSection() {
  const vehicles = useVehicleStore((state) => state.vehicles)

  return (
    <MapContainer
      center={[28.6139, 77.2090]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='© OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Geofence Circle */}
      <Circle
        center={[28.6139, 77.2090]}
        radius={2000}
        pathOptions={{ color: "cyan" }}
      />

      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle._id}
          position={[vehicle.latitude, vehicle.longitude]}
        >
          <Popup>
            <div>
              <strong>{vehicle.driverName}</strong>
              <br />
              Status: {vehicle.status}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}