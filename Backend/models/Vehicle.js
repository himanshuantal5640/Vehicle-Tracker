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
  }
})

export default mongoose.model("Vehicle", vehicleSchema)