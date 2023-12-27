import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBed } from "react-icons/fa"; // Import the desired icon

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/registerroom");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <FaBed className="text-5xl mb-4 text-sky-700" />
      <button
        onClick={handleClick}
        className="bg-sky-700 px-10 py-4 rounded text-white hover:bg-sky-800 transition duration-300"
      >
        Add Room
      </button>
    </div>
  );
};

export default AdminDashboard;
