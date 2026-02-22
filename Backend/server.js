import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import app from "./app.js"
import http from "http"
import { initSocket } from "./websocket/socketServer.js"

connectDB()

// Create HTTP server
const server = http.createServer(app)

// Attach WebSocket + startSimulation
initSocket(server)

// Start server
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})