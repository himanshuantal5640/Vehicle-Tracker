import React from "react"
import api from "./api"

export const getTrips = async () => {
  const res = await api.get("/trips")
  return res.data
}

export const getTripById = async (id) => {
  const res = await api.get(`/trips/${id}`)
  return res.data
}