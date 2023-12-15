import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>
      <Link to={"/admindashboard"}>Dashboard</Link>
    </div>
  );
};

export default Navbar;
