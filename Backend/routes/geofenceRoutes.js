import express from "express"
import Geofence from "../models/Geofence.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, async (req, res) => {
  const zones = await Geofence.find()
  res.json(zones)
})

router.post("/", authMiddleware, async (req, res) => {
  const zone = await Geofence.create(req.body)
  res.json(zone)
})

export default router