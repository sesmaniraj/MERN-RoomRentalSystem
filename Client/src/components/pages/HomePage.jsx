import React from "react";
import "./Homepage.css";
import { useGetRoomQuery } from "../../slices/roomSlice";

const HomePage = () => {
  const { data } = useGetRoomQuery();
  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {data.map((room) => (
        <Card key={room._id} room={room} />
      ))}
      <h1>Homepage</h1>
    </>
  );
};

export default HomePage;
