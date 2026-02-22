import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: String,

  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },

  lat: Number,
  lng: Number,
  speed: Number,
  heading: Number,

  status: {
    type: String,
    enum: ["idle", "active", "delayed"],
    default: "idle"
  }

}, { timestamps: true })

export default mongoose.model("Vehicle", vehicleSchema)