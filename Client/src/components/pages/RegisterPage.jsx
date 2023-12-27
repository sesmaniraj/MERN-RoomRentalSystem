import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Oauth from "../Oauth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full md:w-96">
        <h1 className="text-2xl font-bold mb-4">Register Here</h1>
        <form onSubmit={submitHandler} className="flex flex-col">
          <label htmlFor="username" className="mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="email" className="mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded-md"
          />

          <label htmlFor="password" className="mb-2">
            Password
          </label>
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={handleChange}
              className="p-2 w-full border border-gray-300 rounded-md pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <label htmlFor="phoneNumber" className="mb-2">
            Phone Number
          </label>
          <div className="flex items-center mb-4">
            <span className="mr-2 text-xl"></span>
            <input
              type="tel"
              id="phoneNumber"
              inputMode="numeric"
              onChange={handleChange}
              value="🇳🇵+977"
              className="p-2 border border-gray-300 rounded-md flex-1"
            />
          </div>

          <label htmlFor="address" className="mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            onChange={handleChange}
            className="mb-4 p-2 border border-gray-300 rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>

        <div className="mt-4">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>

        {error && (
          <div className="mt-4 text-red-600">
            <p className="text-red-500 mt-5">{error}</p>
          </div>
        )}

        <Oauth />
      </div>
    </div>
  );
};

export default RegisterPage;
