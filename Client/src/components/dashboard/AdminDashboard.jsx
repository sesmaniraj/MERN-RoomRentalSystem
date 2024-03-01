import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "axios";

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
    fetchUsers();
    fetchBooking();
  }, []);
  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/v1/get");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchBooking = async () => {
    try {
      const response = await fetch("/api/v1/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/v1/getalluser");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };
  const handleDeleteClick = (roomId) => {
    setSelectedRoomId(roomId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/v1/deleteroom/${selectedRoomId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        await fetchRooms();
        console.log("Room deleted successfully:", selectedRoomId);

        setIsDeleteModalOpen(false);
        toast.success("Room has been deleted");
      } else {
        console.error("Failed to delete room");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
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
    <div className="container mx-auto mt-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Room List</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Bedrooms</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room._id}>
                <td className="border px-4 py-2">{room.name}</td>
                <td className="border px-4 py-2">{room.description}</td>
                <td className="border px-4 py-2">{room.bedrooms}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-red-600"
                    onClick={() => handleDeleteClick(room._id)}
                  >
                    <FaTrash />
                  </button>
                  <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600">
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-4">User list</h2>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-blue-500">
              <th className="px-4 py-2">UserName</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">PhoneNumber</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.phoneNumber}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-20">
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

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg z-50"
        overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
      >
        <h2 className="text-2xl font-semibold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to delete this room?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
            onClick={handleConfirmDelete}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default RoomTable;
