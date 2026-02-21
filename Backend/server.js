import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import app from "./app.js";
import http from "http";
import { initSocket } from "./websocket/socketServer.js";

connectDB();

const server = http.createServer(app);

// Attach WebSocket
initSocket(server);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});