import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import app from "./app.js"
import http from "http"
import { initSocket } from "./websocket/socketServer.js"

import { seedVehicles } from "./utils/SeedVehicle.js"
connectDB()

await seedVehicles()

const server = http.createServer(app)

initSocket(server)


server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})