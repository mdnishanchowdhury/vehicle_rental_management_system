import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post('/vehicles',auth("admin"), vehicleController.createVehicle)


export const vehicleRouter = router;