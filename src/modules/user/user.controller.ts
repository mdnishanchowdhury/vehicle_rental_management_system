import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userService.getAllUsers();

        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: true,
            message: error.message,
            datails: error
        })
    }
}

const updateUser = async (req: Request, res: Response) => {

    try {
        const result = await userService.updateUser(req.body, req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(req.params.id as string)

        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not Found",
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

export const userControllerr = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
}