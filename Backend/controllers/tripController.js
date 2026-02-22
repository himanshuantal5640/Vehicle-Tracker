import Trip from "../models/Trip.js"
import Vehicle from "../models/Vehicle.js"

export const createTrip = async (req, res) => {
  const trip = await Trip.create(req.body)

  await Vehicle.findByIdAndUpdate(
    trip.vehicle,
    { status: "active" }
  )

  res.json(trip)
}

export const getTrips = async (req, res) => {
  const trips = await Trip.find()
    .populate("driver vehicle")
  res.json(trips)
}