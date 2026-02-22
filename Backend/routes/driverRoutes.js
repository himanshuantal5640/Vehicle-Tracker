import express from "express"
import Driver from "../models/Driver.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

// Get all drivers
router.get("/", authMiddleware, async (req, res) => {
  const drivers = await Driver.find()
  res.json(drivers)
})

// Create driver
router.post("/", authMiddleware, async (req, res) => {
  const driver = await Driver.create(req.body)
  res.json(driver)
})

router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Driver.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  res.json(updated)
})

export default router