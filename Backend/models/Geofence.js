import mongoose from "mongoose";

const geofenceSchema = new mongoose.Schema({
  name: String,
  type: String,
  lat: Number,
  lng: Number,
  radius: Number
});

export default mongoose.model("Geofence", geofenceSchema);