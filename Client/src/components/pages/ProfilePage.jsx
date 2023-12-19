import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <div>
        <img
          src={currentUser.avatar}
          alt=""
          className="w-12 h-11 shadow-xl mt-10 mx-auto"
        />
      </div>
      <div className="  flex flex-col justify-between item-center my-7">
        <h1 className="text-lg font-bold mx-auto">User Profile</h1>
        <form className="flex flex-col mx-auto  ">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.username}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.email}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
          />
          <label htmlFor="email">Address</label>
          <input
            type="text"
            id="address"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.address}
          />
          <label htmlFor="password">PhoneNumber</label>
          <input
            type="text"
            id="phoneNumber"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.phoneNumber}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-400 my-5 rounded-md disabled:opacity-80"
          >
            {loading ? "Loading.." : "UpdateUser"}
          </button>
        </form>
        <div className="mx-auto flex">
          <span className="mx-20">Delete Account</span>
          <span className="mx-20">Logout Account</span>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
