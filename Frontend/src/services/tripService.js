  import api from "./api"

  // Book a new trip
  export const bookTrip = async (data) => {
    const res = await api.post("/trips/book", data)
    return res.data
  }

  // Get all trips
  export const getTrips = async () => {
    const res = await api.get("/trips")
    return res.data
  }

  // Get single trip by ID
  export const getTripById = async (id) => {
    const res = await api.get(`/trips/${id}`)
    return res.data
  }
  export const startTrip = (id) =>
    api.patch(`/trips/${id}/start`);

  export const completeTrip = (id) =>
    api.patch(`/trips/${id}/complete`);