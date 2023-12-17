import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";
import "../styles/Navbar.css";

const Navbar = () => {
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
              <Link to={"/admindashboard"}>AdminDashboard</Link>
              <hr />
              <Link to={"/ownerdashboard"}>OwnerDashboard</Link>
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
