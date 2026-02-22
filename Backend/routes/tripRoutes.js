import express from "express";
import {
  bookTrip,
  getAllTrips,
  getTripById,
  startTrip,
  completeTrip
} from "../controllers/tripController.js";

const router = express.Router();

router.post("/book", bookTrip);
router.get("/", getAllTrips);
router.get("/:id", getTripById);
router.patch("/:id/start", startTrip);
router.patch("/:id/complete", completeTrip);

export default router;