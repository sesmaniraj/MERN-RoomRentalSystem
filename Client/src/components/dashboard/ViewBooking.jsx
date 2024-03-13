import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    fetchBooking();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `/api/v1/bookings?page=${currentPage}&limit=${itemsPerPage}`
      );
      setBookings(response.data);
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

  // Function to handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mt-2">
        <h2 className="text-2xl font-semibold mb-4">Booking list</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-sky-400">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">PhoneNumber</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id} className="hover:bg-gray-200">
                <td className="border px-4 py-2 ">{booking.name}</td>
                <td className="border px-4 py-2">{booking.address}</td>
                <td className="border px-4 py-2">{booking.phoneNumber}</td>
                <td className="border px-4 py-2">
                  <select
                    name="status"
                    value={booking.status}
                    onChange={(e) => setStatus(e.target.value)}
                    onClick={() => handleStatusUpdate(booking._id)}
                    className="bg-white p-2"
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
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Previous
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={bookings.length < itemsPerPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBooking;
