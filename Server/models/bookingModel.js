import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "accept", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;
