import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import "../styles/Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    try {
      const user = axios.get("http://localhost:8000/api/v1/profile");
      setUser(user);
    } catch (error) {}
  }, []);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="navbar">
      {userInfo ? (
        <>
          <Link to={"/"}>
            <h1>welcome</h1>
          </Link>

          <div className="dropdown">
            <button className="dropbtn">x</button>
            <div className="dropdown-content">
              {user.role === "admin" && (
                <Link to={"/admindashboard"}>AdminDashboard</Link>
              )}
              {user.role === "owner" && (
                <Link to={"/ownerdashboard"}>OwnerDashboard</Link>
              )}

              <hr />
              <hr />
              <h4
                onClick={logoutHandler}
                style={{ cursor: "pointer", textAlign: "center" }}
              >
                Logout
              </h4>
              <hr />
            </div>
          </div>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
