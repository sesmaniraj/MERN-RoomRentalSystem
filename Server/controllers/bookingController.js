// controllers/bookingController.js
import bookingModel from "../models/bookingModel.js";

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await bookingModel.findById(req.params.id);
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const booking = await bookingModel.create(req.body);
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a booking by ID
export const updateBooking = async (req, res) => {
  try {
    const booking = await bookingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a booking by ID
export const deleteBooking = async (req, res) => {
  try {
    await bookingModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
