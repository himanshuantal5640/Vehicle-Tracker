import express from "express"
import { createTrip, getTrips } from "../controllers/tripController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()

router.get("/", authMiddleware, getTrips)
router.post("/", authMiddleware, createTrip)

export default router