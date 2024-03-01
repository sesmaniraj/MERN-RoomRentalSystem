import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
