import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useVehicleStore } from "../../store/vehicleStore";
import "leaflet/dist/leaflet.css";

/* Fix default icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* Arrow icon */
const arrowIcon = (heading) =>
  L.divIcon({
    className: "vehicle-arrow",
    html: `<div style="transform: rotate(${heading}deg)">▲</div>`,
    iconSize: [20, 20],
  });

const GEOFENCE_CENTER = [12.9716, 77.5946];
const GEOFENCE_RADIUS = 2000;

/*Disable / Enable Map Interactions Properly */
function MapController({ disabled }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (disabled) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
      map.touchZoom.disable();
      map.tap && map.tap.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
      map.touchZoom.enable();
      map.tap && map.tap.enable();
    }
  }, [disabled, map]);

  return null;
}

function FlyToSelected() {
  const selectedVehicle = useVehicleStore((state) => state.selectedVehicle);
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle) {
      map.flyTo([selectedVehicle.lat, selectedVehicle.lng], 15, {
        duration: 1.5,
      });
    }
  }, [selectedVehicle, map]);

  return null;
}

export default function MapSection({ disabled = false }) {
  const vehicles = useVehicleStore((state) => state.vehicles);
  const history = useVehicleStore((state) => state.history);
  const selectedTrip = useVehicleStore((state) => state.selectedTrip);

  const zoneActive = vehicles.length > 0;

  return (
    <div className="relative z-0 h-full w-full">
      <MapContainer
        center={GEOFENCE_CENTER}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <MapController disabled={disabled} />

        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToSelected />

        {/* Trip Route */}
        {selectedTrip?.route?.length > 1 && (
          <Polyline
            positions={selectedTrip.route.map((p) => [p.lat, p.lng])}
            pathOptions={{
              color:
                selectedTrip.status === "planned"
                  ? "cyan"
                  : selectedTrip.status === "in-progress"
                    ? "red" // change to red
                    : "gray",
              weight: 4,
            }}
          />
        )}

        {/* Geofence */}
        <Circle
          center={GEOFENCE_CENTER}
          radius={GEOFENCE_RADIUS}
          pathOptions={{
            color: zoneActive ? "red" : "cyan",
            fillColor: zoneActive ? "red" : "cyan",
            fillOpacity: 0.2,
            weight: 3,
          }}
        />

        {vehicles.map((vehicle) => {
          const path = history?.[vehicle._id] || [];

          return (
            <React.Fragment key={vehicle._id}>
              {path.length > 1 && (
                <Polyline
                  positions={path}
                  pathOptions={{
                    color:
                      vehicle.status === "active"
                        ? "lime"
                        : vehicle.status === "delayed"
                          ? "orange"
                          : "gray",
                    weight: 3,
                  }}
                />
              )}

              <Marker
                position={[vehicle.lat, vehicle.lng]}
                icon={arrowIcon(vehicle.heading || 0)}
              >
                <Popup>
                  <div>
                    <strong>{vehicle.driverName}</strong>
                    <br />
                    Speed: {vehicle.speed || 0} km/h
                    <br />
                    Status: {vehicle.status}
                    {selectedTrip && (
                      <>
                        <br />
                        Trip: {selectedTrip.tripId}
                      </>
                    )}
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
