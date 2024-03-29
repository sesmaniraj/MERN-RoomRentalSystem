import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart, logoutSucess, logoutFaliure } from "../slices/userSlice";
import {
  FaSearch,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaColumns,
} from "react-icons/fa";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(logoutStart());
    try {
      const res = await fetch("/api/v1/logout");
      const data = res.json();
      if (data.success === false) {
        dispatch(logoutFaliure(data.message));
        return;
      }
      dispatch(logoutSucess(""));
      navigate("/");
    } catch (error) {
      dispatch(loginFaliure(error.message));
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="bg-gray-800 p-4 shadow-lg flex items-start justify-between flex-col lg:flex-row z-50">
        <div className="flex justify-between items-center gap-4">
          <Link to={"/home"} className="text-lg font-bold text-white">
            HamroRoom
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white p-2 rounded-md mt-2 md:mt-0 w-ful"
          >
            {currentUser ? (
              <>
                {" "}
                <input
                  type="text"
                  placeholder="Search Room here"
                  className="bg-transparent focus:outline-none w-24 sm:w-64 border-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="ml-2">
                  <FaSearch />
                </button>
              </>
            ) : (
              <>
                <h1>Welcome to room rental ,Please Login to continue</h1>
              </>
            )}
          </form>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 md:mt-0">
          {currentUser ? (
            <>
              <Link to={"/profile"} className="flex items-center text-white">
                <img
                  src={currentUser.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2">Profile</span>
              </Link>
              {currentUser.role === "admin" && (
                <Link
                  to={"/admindashboard"}
                  className="flex items-center text-white"
                >
                  <FaColumns className="w-6 h-6" />
                  <span className="ml-2">Dashboard</span>
                </Link>
              )}
              {currentUser.role === "owner" && (
                <Link
                  to={"/ownerdashboard"}
                  className="flex items-center text-white "
                >
                  <FaColumns className="w-6 h-6" />
                  <span className="ml-2">Dashboard</span>
                </Link>
              )}
              <button
                className="flex items-center text-white"
                onClick={handleLogout}
              >
                <FaUser />
                <span className="ml-2 ">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/"}
                className="flex items-center text-white mt-2 md:mt-0"
              >
                <FaSignInAlt className="w-6 h-6" />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to={"/register"}
                className="flex items-center text-white mt-2 md:mt-0"
              >
                <FaUserPlus className="w-6 h-6" />
                <span className="ml-2">Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
