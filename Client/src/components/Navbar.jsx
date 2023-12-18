import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate("/profile");
  };
  return (
    <>
      <div className=" p-6 max-w-l mx-auto bg-sky-400  shadow-lg flex items-center justify-between space-x-4 text-red">
        <div>
          <Link to={"/"}>
            <h1 className="text-lg font-bold">RoomRentalSystem</h1>
          </Link>
        </div>
        <div className="px-2 font-semibold">
          {currentUser ? (
            <>
              <div className="w-12 h-11 shadow-xl">
                <img src={currentUser.avatar} alt="" onClick={handleProfile} />
              </div>
            </>
          ) : (
            <>
              <Link to={"/login"} className="mx-7">
                Login
              </Link>
              <Link to={"/register"}>Register</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
