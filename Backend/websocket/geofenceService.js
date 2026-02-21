import Geofence from "../models/Geofence.js";
import Alert from "../models/Alert.js";
import { calculateDistance } from "../utils/geoUtils.js";

export const checkGeofence = async (vehicle) => {
  const geofences = await Geofence.find();

  for (let fence of geofences) {
    const distance = calculateDistance(
      vehicle.lat,
      vehicle.lng,
      fence.lat,
      fence.lng
    );

    if (distance < fence.radius) {
      const alert = await Alert.create({
        vehicleId: vehicle.id,
        type: "GEOFENCE_ENTRY",
        message: `Vehicle entered ${fence.name}`
      });

      return alert;
    }
  }

  return null;
};