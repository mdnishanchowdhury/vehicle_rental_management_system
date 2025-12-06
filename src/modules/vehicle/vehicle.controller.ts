import { Request, Response } from "express";
import { vehicleService } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.createVehicle(req.body);

        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getVehicles();

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
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSignleVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleService.getSingleVehicles(req.params.id as string);

        res.status(201).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await vehicleService.updateVehicle(req.body, id as string);

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
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

const deleteVehicle = async (req: Request, res: Response) => {
    try {

        const result = await vehicleService.deleteVehicle(req.params.id as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully"
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const vehicleController = {
    createVehicle,
    getVehicles,
    getSignleVehicles,
    updateVehicle,
    deleteVehicle
}