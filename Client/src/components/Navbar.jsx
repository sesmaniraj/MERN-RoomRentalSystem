import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className=" p-6 max-w-l mx-auto bg-sky-400  shadow-lg flex items-center justify-between space-x-4 text-red">
        <div>
          <Link to={"/"}>
            <h1 className="text-lg font-bold">RoomRentalSystem</h1>
          </Link>
        </div>
        <div className="px-2 font-semibold">
          <Link to={"/login"} className="mx-7">
            Login
          </Link>
          <Link to={"/register"}>Register</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
