"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = async (payload) => {
    const { name, email, password, phone, role } = payload;
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }
    const hashedPass = await bcryptjs_1.default.hash(password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
};
const getAllUsers = async () => {
    const result = await db_1.pool.query(`SELECT * FROM users`);
    return result;
};
const updateUser = async (payload, id) => {
    const { name, email, phone, role } = payload;
    const result = await db_1.pool.query(`UPDATE users SET name=$1 , email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, id]);
    return result;
};
const deleteUser = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1`, [id]);
    return result;
};
exports.userService = {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
};
