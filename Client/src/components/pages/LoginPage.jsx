import { React, useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState();
  const handleChange = () => {};
  const submitHandler = async (e) => {
    e.preventDefault();
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
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          className="border-solid border-2 border-sky-500 outline-none rounded-md"
        />

        <button type="submit" className="bg-sky-400 my-5 rounded-md">
          SignIn
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
