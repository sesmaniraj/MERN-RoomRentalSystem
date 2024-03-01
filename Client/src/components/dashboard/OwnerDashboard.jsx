import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="max-w-sm mx-auto rounded overflow-hidden shadow-lg bg-white mt-20">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">Add Room</div>
        <p className="text-gray-700 text-base">
          Click below to add a new room to your listings.
        </p>
      </div>
      <div className="px-6 py-4">
        <Link
          to={"/registerroom"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Room
        </Link>
      </div>
    </div>
  );
};

export default OwnerDashboard;
