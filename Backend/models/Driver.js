import mongoose from "mongoose"

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  licenseNumber: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  }
}, { timestamps: true })

export default mongoose.model("Driver", driverSchema)