import Alert from "../models/Alert.js";
import Vehicle from "../models/Vehicle.js";
function move(vehicle) {
  const deltaLat = (Math.random() - 0.5) * 0.001;
  const deltaLng = (Math.random() - 0.5) * 0.001;

  vehicle.lat += deltaLat;
  vehicle.lng += deltaLng;
  vehicle.speed = Math.floor(Math.random() * 80);
  vehicle.heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI);
}
function moveAlongRoute(vehicle) {
  if (!vehicle.route || vehicle.route.length === 0) return;

  if (vehicle.routeIndex >= vehicle.route.length) {
    vehicle.status = "idle";
    vehicle.route = [];
    vehicle.routeIndex = 0;
    return;
  }

  const point = vehicle.route[vehicle.routeIndex];

  vehicle.lat = point.lat;
  vehicle.lng = point.lng;
  vehicle.speed = 40;
  vehicle.heading = 0;

  vehicle.routeIndex += 1;
}
export default function startSimulation(wss) {
  setInterval(async () => {
    const vehicles = await Vehicle.find();

    for (let vehicle of vehicles) {
      if (vehicle.status === "active" && vehicle.route?.length > 0) {
        moveAlongRoute(vehicle);
        await vehicle.save();
      } else if (vehicle.status === "active" || vehicle.status === "delayed") {
        move(vehicle);
        await vehicle.save();
      }
      if (vehicle.speed > 70) {
        await Alert.create({
          vehicle: vehicle._id,
          type: "SPEED_LIMIT",
          message: "Speed limit exceeded",
        });
      }
      if (vehicle.status === "active" && vehicle.speed === 0) {
        await Alert.create({
          vehicle: vehicle._id,
          type: "IDLE_TOO_LONG",
          message: "Vehicle idle too long",
        });
      }
    }

    const updatedVehicles = await Vehicle.find();

    wss.clients.forEach((client) => {
      client.send(
        JSON.stringify({
          type: "VEHICLE_UPDATE",
          vehicles: updatedVehicles,
        }),
      );
    });
  }, 1000);
}
