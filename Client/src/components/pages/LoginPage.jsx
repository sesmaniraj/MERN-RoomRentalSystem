import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/login", {
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
      navigate("/");
      console.log("login successfully");
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="  flex flex-col justify-between item-center my-7">
      <h1 className="text-lg font-bold mx-auto">Login Here</h1>
      <form
        method="post"
        onSubmit={submitHandler}
        className="flex flex-col mx-auto  "
      >
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-sky-400 my-5 rounded-md disabled:opacity-80"
        >
          {loading ? "Loading.." : "Login"}
        </button>
      </form>
      <div className="flex gap-3 mt-3 mx-auto">
        <p>Dont have an account ?</p>{" "}
        <Link to={"/register"}>
          <span className="text-blue-700">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
