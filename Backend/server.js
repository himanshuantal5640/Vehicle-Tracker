import dotenv from "dotenv"
dotenv.config()

import connectDB from "./config/db.js"
import app from "./app.js"

import http from "http"
import { WebSocketServer } from "ws"

connectDB()

// 🔥 Create HTTP server from express app
const server = http.createServer(app)

// 🔥 Attach WebSocket to same server
const wss = new WebSocketServer({ server })

wss.on("connection", (ws) => {
  console.log("WebSocket Connected")

  ws.send(JSON.stringify({
    type: "CONNECTED",
    message: "WebSocket working"
  }))

  ws.on("close", () => {
    console.log("WebSocket Disconnected")
  })
})

// 🔥 IMPORTANT — DO NOT use app.listen()
server.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`)
})