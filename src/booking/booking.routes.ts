import express from "express";
import { bookingController } from "./booking.controller";
import auth from "../middleware/auth";

const router = express.Router();

router.post('/bookings', auth("admin"), bookingController.createBooking);

export const bookingRoutes = router;