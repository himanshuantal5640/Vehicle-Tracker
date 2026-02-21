import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  vehicleId: String,
  type: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("Alert", alertSchema);