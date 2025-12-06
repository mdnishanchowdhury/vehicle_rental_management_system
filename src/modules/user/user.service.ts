import { pool } from "../../config/db";
import bcrypt from "bcryptjs";


const createUser = async (payload: Record<string, unknown>) => {
    const { name, email, password, phone, role } = payload;

    if (!password || (password as string).length < 6) {
        throw new Error("Password must be at least 6 characters long");
    }

    const hashedPass = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING *`, [name, email, hashedPass, phone, role]);
    return result;
}

export const userService = {
    createUser,
}