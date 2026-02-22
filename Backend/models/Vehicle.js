import mongoose from "mongoose"

const vehicleSchema = new mongoose.Schema({
  driverName: String,
  vehicleNumber: String,
  lat: Number,
  lng: Number,
  status: {
    type: String,
    enum: ["idle", "active", "delayed"],
    default: "idle"
  },
  speed: { type: Number, default: 0 },
  heading: { type: Number, default: 0 },
})

export default mongoose.model("Vehicle", vehicleSchema)