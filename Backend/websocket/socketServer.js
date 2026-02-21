import { WebSocketServer } from "ws";
import startSimulation from "./gpsSimulator.js";

let wss;

export const initSocket = (server) => {
  wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("WebSocket client connected");

    ws.on("close", () => {
      console.log("WebSocket client disconnected");
    });
  });

  startSimulation(wss);
};