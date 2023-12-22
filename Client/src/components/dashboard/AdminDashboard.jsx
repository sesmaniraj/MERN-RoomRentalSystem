import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/registerroom");
  };
  return (
    <>
      <div className=" h-96 flex items-center">
        <button
          onClick={handleClick}
          className="bg-sky-700 mx-auto p-10 rounded"
        >
          Add Room
        </button>
      </div>
    </>
  );
};

export default AdminDashboard;
