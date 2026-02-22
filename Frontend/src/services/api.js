import React from "react"
import axios from "axios"

const api = axios.create({
  baseURL: "https://vehicle-tracker-lila.onrender.com/api",
  withCredentials: true,
})

export default api