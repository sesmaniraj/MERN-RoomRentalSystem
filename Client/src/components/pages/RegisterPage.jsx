import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "../Oauth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
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
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="  flex flex-col justify-between item-center my-7">
      <h1 className="text-lg font-bold mx-auto">Register Here</h1>
      <form
        method="post"
        onSubmit={submitHandler}
        className="flex flex-col mx-auto  "
      >
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={handleChange}
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={handleChange}
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />
        <br />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="number"
          id="phoneNumber"
          onChange={handleChange}
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />
        <br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={handleChange}
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-400 my-5 rounded-md disabled:opacity-80"
        >
          {loading ? "Loading.." : "Register"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-3 mt-3 mx-auto">
        <p>Already have an account ?</p>{" "}
        <Link to={"/login"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
      <div className="mx-auto text-red-600">
        {error ? (
          <p className="text-red-500 mt-5">Please fill add credentials.</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
