import React, { useState } from "react";
import { useSelector } from "react-redux";

const RoomPage = () => {
  const [room, setRoom] = useState([]);
  console.log(room);
  const { currentUser } = useSelector((state) => state.user);
  const handleRoom = async () => {
    try {
      const res = await fetch(`/api/v1/room/${currentUser._id}`);
      const data = await res.json();
      setRoom(data);
      if (data.success === false) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col justify-between">
      <button onClick={handleRoom}>Click to view room</button>
      <div className="w-2/4 h-64 mx-auto flex flex-col justify-evenly">
        {room.map((item) => (
          <div className="flex justify-between ">
            <img src={item.imageUrls} alt="" className="w-20 rounded-xl" />
            <div className="flex flex-col items-center">
              <button className="text-emerald-700">Edit</button>
              <button className="text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
