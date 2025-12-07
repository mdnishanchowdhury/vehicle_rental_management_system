"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllerr = void 0;
const user_service_1 = require("./user.service");
const createUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
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
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userService.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: error.message,
            datails: error
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.updateUser(req.body, req.params.id);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not Found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
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
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userService.deleteUser(req.params.id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not Found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
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
exports.userControllerr = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
