import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterRoomMutation } from "../../slices/roomSlice";
import { toast } from "react-toastify";

const RoomRegister = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("");
  const [registerRoom, { isLoading }] = useRegisterRoomMutation();
  const navigate = useNavigate();

  const submitHandler = async (e, res) => {
    e.preventDefault();
    try {
      const room = await registerRoom({
        name,
        description,
        location,
        price,
        available,
      }).unwrap();
      navigate("/");
      toast("Register Room SuccessFully");

      res.status(200).json({ room });
    } catch (error) {
      toast.error("Room creation failed");
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <h1 style={{ marginTop: "50px" }}>Register your room here</h1>
      <form
        action=""
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "600px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Availablity"
          onChange={(e) => setAvailable(e.target.value)}
        />
        <button type="submit">Register Room</button>
      </form>
    </div>
  );
};

export default RoomRegister;
