import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchBooking();
  }, []);
  const fetchBooking = async () => {
    try {
      const response = await fetch("/api/v1/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const handleStatusUpdate = async (id) => {
    try {
      await axios.patch(`/api/v1/bookings/${id}`, { status });
      await fetchBooking();

      toast.success("updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="mt-2">
        <h2 className="text-2xl font-semibold mb-4">Booking list</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">PhoneNumber</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border px-4 py-2">{booking.name}</td>
                <td className="border px-4 py-2">{booking.address}</td>
                <td className="border px-4 py-2">{booking.phoneNumber}</td>
                <td className="border px-4 py-2">
                  <select
                    name="status"
                    value={booking.status}
                    onChange={(e) => setStatus(e.target.value)}
                    onClick={() => handleStatusUpdate(booking._id)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accept">Accept</option>
                    <option value="declined">Decline</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewBooking;
