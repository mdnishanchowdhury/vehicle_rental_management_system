import { pool } from "../../config/db";

interface BookingPayload {
    customer_id: number;
    vehicle_id: number;
    rent_start_date: string;
    rent_end_date: string;
}

const formatDate = (d: string | Date) => new Date(d).toISOString().split("T")[0];

const createBooking = async (payload: BookingPayload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

    const vehicleResult = await pool.query(
        `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`, [vehicle_id]
    );

    const vehicle = vehicleResult.rows[0];
    if (!vehicle) throw new Error("Vehicle not found");


    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);

    if (end <= start)
        throw new Error("rent_end_date must be after rent_start_date");

    const days = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const total_price = days * vehicle.daily_rent_price;

    const startDateForDB = formatDate(start);
    const endDateForDB = formatDate(end);

    const result = await pool.query(
        `INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1,$2,$3,$4,$5,'active') RETURNING *`, [customer_id, vehicle_id, startDateForDB, endDateForDB, total_price]
    );

    await pool.query(
        `UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id]
    );

    return {
        ...result.rows[0],
        rent_start_date: startDateForDB,
        rent_end_date: endDateForDB,
        vehicle
    };
};


const getBooking = async (payload: Record<string, unknown>) => {
    const { id, role } = payload.user as any;

    let result;

    if (role === "admin") {
        result = await pool.query(`
            SELECT b.*, json_build_object('name', u.name, 'email', u.email) AS customer, json_build_object('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle FROM bookings b JOIN users u ON b.customer_id = u.id JOIN vehicles v ON b.vehicle_id = v.id
        `);
    } else {
        result = await pool.query(`
            SELECT b.*, json_build_object('name', u.name, 'email', u.email) AS customer, json_build_object   ('vehicle_name', v.vehicle_name, 'registration_number', v.registration_number) AS vehicle FROM bookings b
            JOIN users u ON b.customer_id = u.id JOIN vehicles v ON b.vehicle_id = v.id WHERE b.customer_id = $1
        `, [id]);
    }

    return result.rows;
};


const updateBooking = async (payload: Record<string, unknown>, bookingId: string, user: { id: number; role: string }) => {
    const { status } = payload;

    if (user.role === "customer" && status !== "cancelled") {
        throw new Error("Customers can only cancel their booking");
    }

    if (user.role === "customer") {
        const bookingCheck = await pool.query(
            `SELECT * FROM bookings WHERE id=$1 AND customer_id=$2`,
            [bookingId, user.id]
        );
        if (bookingCheck.rows.length === 0) {
            throw new Error("Booking not found or access denied");
        }
    }

    const bookingResult = await pool.query(
        `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
        [status, bookingId]
    );

    if (!bookingResult.rows.length) {
        throw new Error("Booking not found");
    }

    const booking = bookingResult.rows[0];

    let vehicle = undefined;
    if (status === "returned") {
        await pool.query(
            `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
            [booking.vehicle_id]
        );

        const vehicleResult = await pool.query(
            `SELECT availability_status FROM vehicles WHERE id=$1`,
            [booking.vehicle_id]
        );
        vehicle = vehicleResult.rows[0];
    }

    return { ...booking, vehicle };
};


export const bookingService = {
    createBooking,
    getBooking,
    updateBooking
};
