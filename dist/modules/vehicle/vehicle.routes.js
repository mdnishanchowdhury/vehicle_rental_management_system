"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = express_1.default.Router();
router.post('/vehicles', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.createVehicle);
router.get('/vehicles', vehicle_controller_1.vehicleController.getVehicles);
router.get('/vehicles/:id', vehicle_controller_1.vehicleController.getSignleVehicles);
router.put('/vehicles/:id', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.updateVehicle);
router.delete('/vehicles/:id', (0, auth_1.default)("admin"), vehicle_controller_1.vehicleController.deleteVehicle);
exports.vehicleRouter = router;
