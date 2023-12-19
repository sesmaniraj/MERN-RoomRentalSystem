import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const toogleDropdown = () => {
    setIsOpen(!isOpen);
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
                <img src={currentUser.avatar} alt="" onClick={toogleDropdown} />
                {isOpen && (
                  <div className="my-10">
                    <div>
                      <Link
                        to={"/profile"}
                        className="block  py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        Profile
                      </Link>
                      {currentUser.role == "admin" && (
                        <Link
                          to={"/admindashboard"}
                          className="block  py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      {currentUser.role == "owner" && (
                        <Link
                          to={"/ownerdashboard"}
                          className="block  py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                          Owner Dashbord
                        </Link>
                      )}

                      <Link className="block  py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                        Log Out
                      </Link>
                    </div>
                  </div>
                )}
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
