import express from "express"
import Alert from "../models/Alert.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, async (req, res) => {
  const alerts = await Alert.find().sort({ createdAt: -1 })
  res.json(alerts)
})

router.put("/:id/resolve", authMiddleware, async (req, res) => {
  const alert = await Alert.findByIdAndUpdate(
    req.params.id,
    { resolved: true },
    { new: true }
  )
  res.json(alert)
})

export default router