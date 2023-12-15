import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../slices/userSlice";
import { logout } from "../slices/authSlice";

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
    <>
      {userInfo ? (
        <>
          <h1>welcome {userInfo.username}</h1>
          <h2 onClick={logoutHandler} style={{ cursor: "pointer" }}>
            Logout
          </h2>
          <Link to={"/admindashboard"}>Dashboard</Link>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </>
      )}
      <hr />
    </>
  );
};

export default Navbar;
