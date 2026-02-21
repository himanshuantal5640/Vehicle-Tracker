import { checkGeofence } from "./geofenceService.js";

let vehicles = [
  { id: "V1", lat: 12.9716, lng: 77.5946, status: "idle" },
  { id: "V2", lat: 12.9816, lng: 77.6046, status: "in-progress" }
];

function move(vehicle) {
  vehicle.lat += (Math.random() - 0.5) * 0.001;
  vehicle.lng += (Math.random() - 0.5) * 0.001;
}

export default function startSimulation(wss) {
  setInterval(async () => {
    for (let vehicle of vehicles) {
      move(vehicle);

      const alert = await checkGeofence(vehicle);

      if (alert) {
        wss.clients.forEach(client => {
          client.send(JSON.stringify({
            type: "ALERT",
            alert
          }));
        });
      }
    }

    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        type: "VEHICLE_UPDATE",
        vehicles
      }));
    });

  }, 1000);
}