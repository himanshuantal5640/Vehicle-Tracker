import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map;
let routeLine;
let vehicleMarker;

export default function MapView({ trip }) {
  useEffect(() => {
    if (!map) {
      map = L.map("map").setView([12.9716, 77.5946], 13);

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
        }
      ).addTo(map);
    }

    if (trip?.route?.length) {
      const latlngs = trip.route.map((p) => [p.lat, p.lng]);

      if (routeLine) {
        routeLine.remove();
      }

      routeLine = L.polyline(latlngs, {
        color: "blue",
        weight: 4,
      }).addTo(map);

      map.fitBounds(routeLine.getBounds());

      if (vehicleMarker) {
        vehicleMarker.remove();
      }

      vehicleMarker = L.marker(latlngs[0]).addTo(map);

      let index = 0;

      const interval = setInterval(() => {
        if (index < latlngs.length) {
          vehicleMarker.setLatLng(latlngs[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 500);
    }
  }, [trip]);

  return <div id="map" style={{ height: "500px" }} />;
}