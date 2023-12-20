import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFaliure,
  updateUserSucess,
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSucess,
} from "../../slices/userSlice";

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/v1/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.sucess === false) {
        dispatch(updateUserFaliure(data.message));
        return;
      }
      dispatch(updateUserSucess(data));
    } catch (error) {
      dispatch(updateUserFaliure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart);
      const res = await fetch(`/api/v1/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.sucess === false) {
        dispatch(deleteUserFaliure(data.message));
        return;
      }
      dispatch(deleteUserSucess(data));
    } catch (error) {
      dispatch(deleteUserFaliure(error.message));
    }
  };
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
        <form onSubmit={handleSubmit} className="flex flex-col mx-auto  ">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            id="username"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            onChange={handleChange}
          />
          <label htmlFor="email">Address</label>
          <input
            type="text"
            id="address"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.address}
            onChange={handleChange}
          />
          <label htmlFor="password">PhoneNumber</label>
          <input
            type="text"
            id="phoneNumber"
            className="border-solid border-2 border-sky-500 outline-none rounded-md"
            defaultValue={currentUser.phoneNumber}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-sky-400 my-5 rounded-md disabled:opacity-80"
          >
            Update
          </button>
        </form>
        <div className="mx-auto">
          <span onClick={handleDeleteUser} className="pointer">
            Delete Account
          </span>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
