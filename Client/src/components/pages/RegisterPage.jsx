import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../utils/Loader";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  let number = "🇳🇵+977";

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
      toast.success(data.message);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 w-full ">
      <div className="bg-white p-8 rounded shadow-md w-full ">
        <h1 className="text-2xl font-bold mb-4">Register Here</h1>
        <form onSubmit={submitHandler} className="flex flex-col w-full">
          <div className="flex items-center justify-between gap-5">
            <div className="w-1/2">
              <label htmlFor="username" className="mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                onChange={handleChange}
                required
                placeholder="Enter your username"
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="w-1/2">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  required
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="p-2 border border-gray-300 rounded-md pr-10 w-full"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="w-1/2">
              <label htmlFor="phoneNumber" className="mb-2">
                Phone Number
              </label>
              <div className="flex items-center mb-4">
                <span className="mr-2 text-sm">{number}</span>
                <input
                  type="tel"
                  id="phoneNumber"
                  required
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md flex-1 w-full"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="w-1/2">
              <label htmlFor="address" className="mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                required
                onChange={handleChange}
                placeholder="Enter Your Address"
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="priceRange" className="mb-2">
                Price Range
              </label>
              <input
                type="number"
                id="priceRange"
                required
                onChange={handleChange}
                placeholder="Enter your price Range"
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
          <div className="w-full mb-5">
            <label htmlFor="address" className="mb-2">
              Register As
            </label>
            <select
              id="role"
              onChange={handleChange}
              className="p-3 w-full bg-white border border-gray-300 "
            >
              <option value="">Select Role</option>
              <option value="owner">Vendor</option>
              <option value="user">User</option>
            </select>
          </div>

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
            <Link to="/" className="text-blue-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
