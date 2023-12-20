import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomRegister = () => {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmitImage = () => {};
  const submitHandler = async () => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="text-center my-10">
        <h1>Register your room here</h1>
      </div>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex gap-2 my-10  flex-col w-6/12 mx-auto"
      >
        <input
          id="name"
          onChange={handleChange}
          type="text"
          placeholder="Enter Name"
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
          required
        />
        <textarea
          id="description"
          onChange={handleChange}
          type="text"
          placeholder="Description"
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
        />
        <input
          id="address"
          onChange={handleChange}
          type="text"
          placeholder="Address"
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
          required
        />
        <div className="flex gap-5 ">
          <div className="flex gap-2">
            <input type="checkbox" id="parking" />
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="available" />
            <span>Available</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id="furnished" />
            <span>Furnished</span>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">BedRooms</label>
          <input
            type="Number"
            id="bedrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
          />
          <label htmlFor="">BathRooms</label>
          <input
            type="Number"
            id="bathrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
          />
          <label htmlFor="">RegularPrice(1000 per month)</label>
          <input
            type="Number"
            id="regularprice"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
          />
          <label htmlFor="">DiscountedPrice(1000 per month)</label>
          <input
            type="Number"
            id="discountprice"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
          />
          <label htmlFor="">Images</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            className="p-3 border border-gray-300 rounded-lg"
            onChange={(e) => setFiles(e.target.value)}
          />
          <button
            onClick={handleSubmitImage}
            className="bg-slate-400 rounded-md p-2 m-10"
          >
            Upload Image
          </button>
        </div>
        <button type="submit" className="bg-sky-400 rounded-md p-2">
          Register Room
        </button>
      </form>
    </div>
  );
};

export default RoomRegister;
