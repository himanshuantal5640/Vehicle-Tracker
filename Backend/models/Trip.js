import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  tripId: String,
  driverName: String,
  vehicleId: String,
  status: String
});

export default mongoose.model("Trip", tripSchema);