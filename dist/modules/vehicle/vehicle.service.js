"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status]);
    return result;
};
const getVehicles = async () => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles`);
    return result;
};
const getSingleVehicles = async (id) => {
    const result = await db_1.pool.query(`SELECT * FROM vehicles WHERE id=$1`, [id]);
    return result;
};
const updateVehicle = async (payload, id) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = payload;
    const result = await db_1.pool.query(`UPDATE vehicles SET vehicle_name=$1 , type=$2, registration_number=$3 , daily_rent_price=$4 , availability_status=$5  WHERE id=$6 RETURNING *`, [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]);
    return result;
};
const deleteVehicle = async (id) => {
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id=$1`, [id]);
    return result;
};
exports.vehicleService = {
    createVehicle,
    getVehicles,
    getSingleVehicles,
    updateVehicle,
    deleteVehicle
};
