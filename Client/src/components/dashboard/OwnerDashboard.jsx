import React, { useState } from "react";
import { FaPlus, FaUser, FaEye } from "react-icons/fa";
import RoomRegister from "../pages/RoomRegister";
import ProfilePage from "../pages/ProfilePage";
import ViewRoom from "./ViewRoom";
import ViewUser from "./ViewUser";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("profile");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        <Link to={"/home"}>
          <span>Room Rental System</span>
        </Link>
        <span>Welcome Owner</span>
      </div>

      {/* Sidebar and main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 whitespace-nowrap">
            Owner Panel
          </h2>
          <ul>
            <li
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleItemClick("addRoom")}
            >
              <FaPlus className="mr-2" />
              <span>Add Room</span>
            </li>
            <li
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleItemClick("profile")}
            >
              <FaUser className="mr-2" />
              <span>Profile</span>
            </li>
            <li
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleItemClick("viewRoom")}
            >
              <FaEye className="mr-2" />
              <span>View Room</span>
            </li>
            {/* Add more sidebar items as needed */}
          </ul>
        </div>

        {/* Main content */}
        <div className="w-3/4 p-4">
          {selectedItem === "addRoom" && (
            <div>
              <RoomRegister />
            </div>
          )}
          {selectedItem === "profile" && (
            <div>
              <ProfilePage />
            </div>
          )}
          {selectedItem === "viewRoom" && (
            <div>
              <ViewRoom />
            </div>
          )}
          {/* Add more conditions for other sidebar items */}
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
