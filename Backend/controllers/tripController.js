import Trip from "../models/Trip.js";
import Driver from "../models/Driver.js";
import axios from "axios";
import { getWSS } from "../websocket/socketServer.js";

const generateTripId = () => `TRIP-${Date.now()}`;

export const bookTrip = async (req, res) => {
  try {
    console.log("Incoming Body:", req.body);

    const { sourceName, destinationName } = req.body;

    if (!sourceName || !destinationName) {
      return res.status(400).json({
        message: "Source and Destination names required",
      });
    }
    const availableDriver = await Driver.findOne({
      status: "idle",
    });

    console.log("Driver Found:", availableDriver);

    if (!availableDriver) {
      return res.status(400).json({
        message: "No idle drivers available",
      });
    }

    const geoSource = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: sourceName + ", India",
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "fleetpulse-app",
        },
      }
    );
    const geoDestination = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: destinationName + ", India",
          format: "json",
          limit: 1,
        },
        headers: {
          "User-Agent": "fleetpulse-app",
        },
      }
    );

    if (!geoSource.data.length || !geoDestination.data.length) {
      return res.status(400).json({
        message: "Invalid source or destination location",
      });
    }

    const source = {
      lat: parseFloat(geoSource.data[0].lat),
      lng: parseFloat(geoSource.data[0].lon),
    };

    const destination = {
      lat: parseFloat(geoDestination.data[0].lat),
      lng: parseFloat(geoDestination.data[0].lon),
    };
    const routeResponse = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`
    );

    const coordinates =
      routeResponse.data.routes[0].geometry.coordinates;

    const formattedRoute = coordinates.map((coord) => ({
      lng: coord[0],
      lat: coord[1],
    }));
    availableDriver.status = "active";
    await availableDriver.save();
    const trip = await Trip.create({
      tripId: generateTripId(),
      driverName: availableDriver.driverName,
      vehicleId: availableDriver.vehicleNumber,
      sourceName,
      destinationName,
      source,
      destination,
      route: formattedRoute,
      status: "planned",
    });

    res.status(201).json(trip);

  } catch (error) {
    console.error("Trip Booking Error:", error);
    res.status(500).json({
      message: "Trip booking failed",
    });
  }
};
export const getAllTrips = async (req, res) => {
  const trips = await Trip.find().sort({ createdAt: -1 });
  res.json(trips);
};

export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID" });
  }
};
export const startTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    trip.status = "in-progress";
    await trip.save();

    const driver = await Driver.findOne({
      driverName: trip.driverName,
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    const route = trip.route;
    let index = 0;

    const wss = getWSS();

    const interval = setInterval(async () => {
      if (index >= route.length) {
        clearInterval(interval);

        trip.status = "completed";
        await trip.save();

        driver.status = "idle";
        await driver.save();

        console.log("Trip Completed");
        return;
      }

     
      driver.lat = route[index].lat;
      driver.lng = route[index].lng;
      driver.status = "active";
      await driver.save();

      index++;
      const allDrivers = await Driver.find();

      wss.clients.forEach((client) => {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              type: "VEHICLE_UPDATE",
              vehicles: allDrivers,
            })
          );
        }
      });

    }, 1000); 

    res.json(trip);

  } catch (error) {
    console.error("Start Trip Error:", error);
    res.status(500).json({ message: "Failed to start trip" });
  }
};

export const completeTrip = async (req, res) => {
  const trip = await Trip.findByIdAndUpdate(
    req.params.id,
    { status: "completed" },
    { new: true }
  );
  res.json(trip);
};
