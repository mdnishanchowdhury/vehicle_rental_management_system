import express from "express";
import { vehicleController } from "./vehicle.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post('/vehicles', auth("admin"), vehicleController.createVehicle);

router.get('/vehicles', vehicleController.getVehicles);

router.get('/vehicles/:id', vehicleController.getSignleVehicles);

router.put('/vehicles/:id', auth("admin"), vehicleController.updateVehicle)

router.delete('/vehicles/:id',auth("admin"), vehicleController.deleteVehicle)

export const vehicleRouter = router;