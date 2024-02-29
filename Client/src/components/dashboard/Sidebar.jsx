import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-full bg-stone-500 text-white w-64 p-4 -z-30">
      <h2 className="text-xl font-bold mb-4 mt-20">Admin Panel</h2>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="text-blue-300 hover:text-blue-500">
            Dashboard
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/users" className="text-blue-300 hover:text-blue-500">
            Users
          </Link>
        </li>
        <li className="mb-2">
          <Link
            to="/registerroom"
            className="text-blue-300 hover:text-blue-500"
          >
            Add Room
          </Link>
        </li>
        <li className="mb-2">
          <Link to="/products" className="text-blue-300 hover:text-blue-500">
            Bookings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
