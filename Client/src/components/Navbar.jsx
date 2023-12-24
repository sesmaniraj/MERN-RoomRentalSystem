import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutStart, logoutSucess, logoutFaliure } from "../slices/userSlice";
import "./Navbar.css";
import IconLayoutDashboard from "../icons/DashboardIcon";
import IconLogout from "../icons/LogoutIcon";
import { FaSearch } from "react-icons/fa";
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
      <div className="p-6 max-w-l mx-auto bg-sky-400  shadow-lg flex items-start flex-col">
        <div className="flex justify-between items-center gap-20">
          <Link to={"/"}>
            <h1 className="text-lg font-bold">HamroRoom</h1>
          </Link>
          <form
            action=""
            onSubmit={handleSearch}
            className="bg-slate-100 p-3 rounded-lg flex items-center"
          >
            <input
              type="text"
              placeholder="Search Room here"
              className="bg-transparent focus:outline-none w-24 sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch />
            </button>
          </form>
        </div>
        <div>
          {currentUser ? (
            <>
              {
                <div className="nav">
                  <div className="nav-content">
                    <Link to={"/profile"} className="nav-item">
                      <img
                        src={currentUser.avatar}
                        alt=""
                        className="w-[3em] h-[3em] icon"
                      />{" "}
                      <span>Profile</span>
                    </Link>
                    {currentUser.role == "admin" && (
                      <Link to={"/admindashboard"} className="nav-item">
                        <IconLayoutDashboard className="icon" />
                        <span>Dashboard</span>
                      </Link>
                    )}
                    {currentUser.role == "owner" && (
                      <Link to={"/ownerdashboard"} className="nav-item ">
                        <IconLayoutDashboard className="icon" />
                        <span>Dashboard</span>
                      </Link>
                    )}

                    <Link className="nav-item">
                      <IconLogout className="icon" onClick={handleLogout} />
                      <span onClick={handleLogout}>Logout</span>
                    </Link>
                  </div>
                </div>
              }
            </>
          ) : (
            <>
              <div>
                <Link to={"/login"} className="mx-7">
                  Login
                </Link>
                <Link to={"/register"}>Register</Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
