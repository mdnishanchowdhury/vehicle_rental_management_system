"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const booking = await booking_service_1.bookingService.createBooking(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: booking
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
const getBooking = async (req, res) => {
    try {
        const bookings = await booking_service_1.bookingService.getBooking({ user: req.user });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            errors: error.message,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required",
            });
        }
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        const booking = await booking_service_1.bookingService.updateBooking(req.body, bookingId, user);
        const message = booking.status === "returned"
            ? "Booking marked as returned. Vehicle is now available"
            : "Booking cancelled successfully";
        res.status(200).json({
            success: true,
            message,
            data: booking,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getBooking,
    updateBooking
};
