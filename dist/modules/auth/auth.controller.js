"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("./auth.service");
const signinUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            datails: error
        });
    }
};
exports.authController = {
    signinUser
};
