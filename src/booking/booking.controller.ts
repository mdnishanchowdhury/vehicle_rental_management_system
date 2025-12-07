import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        const booking = await bookingService.createBooking(req.body);

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });

    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Controller
const getBooking = async (req: Request, res: Response) => {
// console.log("user",req.user)
// const { id, name, email, role } =req.user;
    try {
        const bookings = await bookingService.getBooking({ user: req.user as any });

        if (!bookings || bookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No bookings found",
                data: [],
            });
        }

        res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully",
            data: bookings,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: error.message,
        });
    }
};



export const bookingController = {
    createBooking,
    getBooking
};
