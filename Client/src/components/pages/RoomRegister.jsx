import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomRegister = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
    console.log(formData)
  }

  const submitHandler = async (e, res) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="flex justify-center my-10"><h1>Register your room here</h1></div>
      <form action="" onSubmit={submitHandler} className="flex justify-between gap-2 my-10 items-center flex-col">
        <input id="name" onChange={handleChange} type="text" placeholder="Enter Name" className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"/>
        <input id="description" onChange={handleChange} type="text" placeholder="Description" className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"/>
        <input id="location" onChange={handleChange} type="text" placeholder="Enter Location" className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"/>
        <input id="price" onChange={handleChange} type="text" placeholder="Enter price" className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"/>
        <input id="availability" onChange={handleChange} type="text" placeholder="Enter Availablity" className="border-solid p-1.5 border-2 border-sky-500 outline-none rounded-md"/>
        <button type="submit" className="bg-sky-400 rounded-md p-2">Register Room</button>
      </form>
    </div>
  );
};

export default RoomRegister;
