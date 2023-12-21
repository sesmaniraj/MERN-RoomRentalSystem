import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserFaliure,
  updateUserSucess,
  deleteUserFaliure,
  deleteUserStart,
  deleteUserSucess,
} from "../../slices/userSlice";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase.js";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  console.log(formData);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  console.log(filePerc);
  console.log(fileUploadError);
  const dispatch = useDispatch();

  //getting data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
  };

  //submit handeler
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

  //deleting account
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
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
      <div className="  flex flex-col justify-between item-center my-7">
        <h1 className="text-lg font-bold mx-auto">User Profile</h1>
        <div>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <img
            src={formData.avatar || currentUser.avatar}
            alt=""
            className="w-16 h-16 shadow-xl mt-10 mx-auto"
            onClick={() => fileRef.current.click()}
          />
        </div>
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
