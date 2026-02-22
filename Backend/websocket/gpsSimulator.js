import Alert from "../models/Alert.js"
import Vehicle from "../models/Vehicle.js"
function move(vehicle) {
  const deltaLat = (Math.random() - 0.5) * 0.001
  const deltaLng = (Math.random() - 0.5) * 0.001

  vehicle.lat += deltaLat
  vehicle.lng += deltaLng
  vehicle.speed = Math.floor(Math.random() * 80)
  vehicle.heading = Math.atan2(deltaLng, deltaLat) * (180 / Math.PI)
}

export default function startSimulation(wss) {
  setInterval(async () => {

    const vehicles = await Vehicle.find()

    for (let vehicle of vehicles) {

      // 🔥 MOVE ONLY ACTIVE OR DELAYED
      if (vehicle.status === "active" || vehicle.status === "delayed") {
        move(vehicle)
        await vehicle.save()
      }
      if (vehicle.speed > 70) {
  await Alert.create({
    vehicle: vehicle._id,
    type: "SPEED_LIMIT",
    message: "Speed limit exceeded"
  })
}
if (vehicle.status === "active" && vehicle.speed === 0) {
  await Alert.create({
    vehicle: vehicle._id,
    type: "IDLE_TOO_LONG",
    message: "Vehicle idle too long"
  })
}

    }

    const updatedVehicles = await Vehicle.find()

    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        type: "VEHICLE_UPDATE",
        vehicles: updatedVehicles
      }))
    })

  }, 1000)
}