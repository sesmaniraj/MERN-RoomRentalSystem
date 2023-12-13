import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <form method="post">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          id="username"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="number"
          id="phone_number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          value={phoneNumber}
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <button type="submit" onClick={handleClick}>
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Register;
