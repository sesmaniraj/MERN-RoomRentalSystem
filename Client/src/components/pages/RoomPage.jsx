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
    <div>
      <button onClick={handleRoom}>Click to view room</button>
      <div className="bg-red-600">
        {room.map((item) => (
          <ul>
            <li>{item.name}</li>
            <li>{item.description}</li>
            <li>{item.address}</li>
            <img src={item.imageUrls} alt="" />
            <li>{item.furnished}</li>
            <li>{item.regularPrice}</li>
            <li>{item.available}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
