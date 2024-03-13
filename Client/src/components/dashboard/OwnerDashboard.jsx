import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">Owner Dashboard</h1>
      </div>

      {/* Main content area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="bg-gray-800 text-white w-64">
          <div className="p-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <ul className="mt-6">
              <li className="mb-4">
                <Link
                  to="/ownerdashboard"
                  className="text-blue-500 hover:text-blue-300"
                >
                  Dashboard
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/registerroom"
                  className="text-blue-500 hover:text-blue-300"
                >
                  Add Room
                </Link>
              </li>
              {/* Add more sidebar links as needed */}
            </ul>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 bg-white p-10">
          <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Add Room</div>
              <p className="text-gray-700 text-base">
                Click below to add a new room to your listings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
