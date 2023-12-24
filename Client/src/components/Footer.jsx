import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-sky-600 w-full h-20 sticky bottom-0">
      <Link to={"/about"} className=" flex items-center">
        About
      </Link>
    </div>
  );
};

export default Footer;
