"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = require("./modules/user/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const vehicle_routes_1 = require("./modules/vehicle/vehicle.routes");
const booking_routes_1 = require("./modules/booking/booking.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.get('/', (req, res) => {
    res.send('Vehicle Rental Management System Backend is up and running.');
});
(0, db_1.default)();
// create user
app.use('/api/v1', user_routes_1.userRouter);
// Authentication
app.use('/api/v1/auth', auth_routes_1.authRoutes);
// vehicles
app.use('/api/v1', vehicle_routes_1.vehicleRouter);
// bookings
app.use('/api/v1', booking_routes_1.bookingRoutes);
app.listen(config_1.default.port, () => {
    console.log(`Example app listening on port ${config_1.default.port}`);
});
