import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomRegister = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e, res) => {
    e.preventDefault();
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
        <input type="text" placeholder="Enter Name" />
        <input type="text" placeholder="Description" />
        <input type="text" placeholder="Enter Location" />
        <input type="text" placeholder="Enter price" />
        <input type="text" placeholder="Enter Availablity" />
        <button type="submit">Register Room</button>
      </form>
    </div>
  );
};

export default RoomRegister;
