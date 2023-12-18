import { React } from "react";

const LoginPage = () => {
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">LogIn</button>
      </form>
    </div>
  );
};

export default LoginPage;
