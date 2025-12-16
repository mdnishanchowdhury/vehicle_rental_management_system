"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    message: "You are not allowed!!"
                });
            }
            const token = authHeader.split(' ')[1];
            if (!token)
                return res.status(401).json({ message: "Token missing!" });
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtSecret);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    error: "Unauthorized!!"
                });
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};
exports.default = auth;
