import express from "express"
import Vehicle from "../models/Vehicle.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, async (req, res) => {
  const vehicles = await Vehicle.find().populate("driver")
  res.json(vehicles)
})

router.post("/", authMiddleware, async (req, res) => {
  const vehicle = await Vehicle.create(req.body)
  res.json(vehicle)
})

router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Vehicle.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
})

export default router