import mongoose from "mongoose"

const tripSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },
  startLocation: String,
  destination: String,
  distance: Number,
  status: {
    type: String,
    enum: ["planned", "ongoing", "completed", "cancelled"],
    default: "planned"
  },
  expectedArrival: Date,
  startTime: Date,
  endTime: Date
}, { timestamps: true })

export default mongoose.model("Trip", tripSchema)