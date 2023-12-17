import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userSlice";
import { setCrendentials } from "../../slices/authSlice";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [selectedRole, setSelectedRole] = useState("user");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        username,
        email,
        password,
        address,
        phoneNumber,
        selectedRole,
      }).unwrap();
      dispatch(setCrendentials({ ...res }));
      toast("Login Sucessfully");
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <form method="post" onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          id="username"
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <br />
        <label htmlFor="phone_number">Phone Number</label>
        <input
          type="number"
          id="phone_number"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
          value={phoneNumber}
        />
        <br />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          value={address}
        />
        <br />
        <div>
          <h1>Login As</h1>
          <label htmlFor="owner">Owner</label>
          <input
            type="radio"
            id="owner"
            value={selectedRole}
            checked={selectedRole === "owner"}
            onChange={() => setSelectedRole("owner")}
          />

          <label htmlFor="user">User</label>
          <input
            type="radio"
            id="user"
            value={selectedRole}
            checked={selectedRole === "user"}
            onChange={() => setSelectedRole("user")}
          />
        </div>
        <br />

        <button type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default RegisterPage;
