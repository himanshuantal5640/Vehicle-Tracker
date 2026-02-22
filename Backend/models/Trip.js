import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  tripId: String,
  driverName: String,
  vehicleId: String,

  sourceName: String,
  destinationName: String,

  source: {
    lat: Number,
    lng: Number,
  },

  destination: {
    lat: Number,
    lng: Number,
  },

  route: [
    {
      lat: Number,
      lng: Number,
    },
  ],

  status: {
    type: String,
    default: "planned",
  },
});

export default mongoose.model("Trip", tripSchema);