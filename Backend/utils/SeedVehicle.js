import Vehicle from "../models/Vehicle.js"

export const seedVehicles = async () => {
  const count = await Vehicle.countDocuments()

  if (count === 0) {
    await Vehicle.insertMany([
      {
        driverName: "Arjun Mehta",
        vehicleNumber: "KA01AB1234",
        lat: 12.9716,
        lng: 77.5946,
        status: "active"
      },
      {
        driverName: "Priya Sharma",
        vehicleNumber: "KA02CD5678",
        lat: 12.9816,
        lng: 77.6046,
        status: "delayed"
      },
      {
        driverName: "Karan Singh",
        vehicleNumber: "KA03EF9999",
        lat: 12.9750,
        lng: 77.5900,
        status: "idle"
      }
    ])
  }
}