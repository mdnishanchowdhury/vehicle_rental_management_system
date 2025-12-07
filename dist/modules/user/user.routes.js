"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/auth/signup", user_controller_1.userControllerr.createUser);
router.get('/users', user_controller_1.userControllerr.getAllUsers);
router.put("/users/:id", user_controller_1.userControllerr.updateUser);
router.delete("/users/:id", user_controller_1.userControllerr.deleteUser);
exports.userRouter = router;
