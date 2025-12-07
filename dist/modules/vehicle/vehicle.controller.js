"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.getVehicles();
        if (result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            });
        }
        res.status(201).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getSignleVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.getSingleVehicles(req.params.id);
        res.status(201).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateVehicle = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await vehicle_service_1.vehicleService.updateVehicle(req.body, id);
        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleService.deleteVehicle(req.params.id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not Found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.vehicleController = {
    createVehicle,
    getVehicles,
    getSignleVehicles,
    updateVehicle,
    deleteVehicle
};
