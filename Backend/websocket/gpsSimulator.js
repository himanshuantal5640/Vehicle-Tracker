
import Vehicle from "../models/Vehicle.js"


// function move(vehicle) {
//   vehicle.lat += (Math.random() - 0.5) * 0.001
//   vehicle.lng += (Math.random() - 0.5) * 0.001
// }
function move(vehicle) {
  const deltaLat = (Math.random() - 0.5) * 0.001
  const deltaLng = (Math.random() - 0.5) * 0.001

  vehicle.lat += deltaLat
  vehicle.lng += deltaLng

  // Speed calculation (km/h simulated)
  vehicle.speed = Math.floor(Math.random() * 80)

  // Heading (direction angle)
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