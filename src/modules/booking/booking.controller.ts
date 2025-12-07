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


const getBooking = async (req: Request, res: Response) => {
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

const updateBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }

        const user = req.user as { id: number; role: string } | undefined;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const booking = await bookingService.updateBooking(req.body, bookingId, user);

        const message = booking.status === "returned"
            ? "Booking marked as returned. Vehicle is now available"
            : "Booking cancelled successfully";

        res.status(200).json({
            success: true,
            message,
            data: booking,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const bookingController = {
    createBooking,
    getBooking,
    updateBooking
};
