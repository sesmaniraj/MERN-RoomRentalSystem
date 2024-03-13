import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import { FaPlus, FaUser, FaEye } from "react-icons/fa";
import ViewBooking from "./ViewBooking";
import ProfilePage from "../pages/ProfilePage";
import RoomRegister from "../pages/RoomRegister";
import ViewRoom from "./ViewRoom";
import ViewUser from "./ViewUser";

const RoomTable = () => {
  const [selectedItem, setSelectedItem] = useState("profile");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top bar */}
      <div className="bg-gray-800 text-white p-4 flex justify-between">
        <span>Room Rental System</span>
        <span>Welcome Admin</span>
      </div>

      {/* Sidebar and main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-200 p-4">
          <h2 className="text-2xl font-semibold mb-4 whitespace-nowrap">
            Admin Panel
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
            <li
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleItemClick("viewBooking")}
            >
              <FaBook className="mr-2" />
              <span>View Booking</span>
            </li>
            <li
              className="flex items-center mb-2 cursor-pointer"
              onClick={() => handleItemClick("viewUser")}
            >
              <FaUser className="mr-2" />
              <span>View User</span>
            </li>
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
          {selectedItem === "viewBooking" && (
            <div>
              <ViewBooking />
            </div>
          )}
          {selectedItem === "viewUser" && (
            <div>
              <ViewUser />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomTable;
