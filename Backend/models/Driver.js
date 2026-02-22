import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  lat: Number,
  lng: Number,
  status: {
    type: String,
    enum: ["idle", "active", "delayed"],
    default: "idle",
  },
  heading: Number,
  speed: Number,
}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);