import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart, logoutSucess, logoutFaliure } from "../slices/userSlice";
import IconLayoutDashboard from "../icons/DashboardIcon";
import IconLogout from "../icons/LogoutIcon";
import { FaSearch, FaSignInAlt, FaUserPlus } from "react-icons/fa";

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
      navigate("/login");
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
      <div className="bg-sky-400 p-4 shadow-lg flex items-start justify-between flex-col md:flex-row">
        <div className="flex justify-between items-center gap-4">
          <Link to={"/"} className="text-lg font-bold text-black">
            HamroRoom
          </Link>
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white p-2 rounded-md mt-2 md:mt-0"
          >
            <input
              type="text"
              placeholder="Search Room here"
              className="bg-transparent focus:outline-none w-24 sm:w-64 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="ml-2">
              <FaSearch />
            </button>
          </form>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          {currentUser ? (
            <>
              <Link to={"/profile"} className="flex items-center text-black">
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
                  className="flex items-center text-black"
                >
                  <IconLayoutDashboard className="w-6 h-6" />
                  <span className="ml-2">Dashboard</span>
                </Link>
              )}
              {currentUser.role === "owner" && (
                <Link
                  to={"/ownerdashboard"}
                  className="flex items-center text-black"
                >
                  <IconLayoutDashboard className="w-6 h-6" />
                  <span className="ml-2">Dashboard</span>
                </Link>
              )}
              <button
                className="flex items-center text-black"
                onClick={handleLogout}
              >
                <IconLogout className="w-6 h-6" />
                <span className="ml-2">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="flex items-center text-black mt-2 md:mt-0"
              >
                <FaSignInAlt className="w-6 h-6" />
                <span className="ml-2">Login</span>
              </Link>
              <Link
                to={"/register"}
                className="flex items-center text-black mt-2 md:mt-0"
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
