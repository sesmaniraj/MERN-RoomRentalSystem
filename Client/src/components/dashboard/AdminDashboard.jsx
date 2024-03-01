import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "react-modal";
import { toast } from "react-toastify";

const RoomTable = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);
  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/v1/get");
      const data = await response.json();
      setRooms(data); // Assuming the response contains an array of rooms
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
      // Call delete API with selectedRoomId
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

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Room List</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
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
                  className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 hover:bg-blue-600"
                  onClick={() => handleDeleteClick(room._id)}
                >
                  <FaTrash />
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Modal */}
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
