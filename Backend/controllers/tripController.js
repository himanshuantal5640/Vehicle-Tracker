import Trip from "../models/Trip.js";

export const getTrips = async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
};