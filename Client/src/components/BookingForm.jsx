// components/BookingForm.jsx
import React, { useState } from "react";

const BookingForm = ({ room, onBook }) => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room: room._id,
        ...formData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Do something with the booking response
        console.log("Booking successful:", data);
        // Trigger the onBook callback if provided
        if (onBook) {
          onBook();
        }
      })
      .catch((error) => {
        console.error("Error booking room:", error);
      });
  };

  return (
    <div>
      <h2>Book Room: {room.name}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingForm;
