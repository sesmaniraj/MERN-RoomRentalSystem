import { React, useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState();

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form method="post" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <br />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <br />
        <label htmlFor="phone_number">Phone Number</label>
        <input type="number" id="phone_number" />
        <br />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" />
        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default RegisterPage;
