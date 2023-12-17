import React from "react";
import "./Homepage.css";
import Card from "../utils/Card";
import { useGetRoomQuery } from "../../slices/roomSlice";

const HomePage = () => {
  const { data } = useGetRoomQuery();
  console.log(data);
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data.map((room) => (
        <Card key={room._id} room={room} />
      ))}
    </>
  );
};

export default HomePage;
