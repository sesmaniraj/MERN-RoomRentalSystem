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
import { Link } from "react-router-dom";
import {
  FaUserEdit,
  FaTrash,
  FaUserTimes,
  FaSearch,
  FaEdit,
} from "react-icons/fa";

const ProfilePage = () => {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [room, setRoom] = useState([]);
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
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

  //submit handler
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

  //getting room
  const handleRoom = async () => {
    try {
      const res = await fetch(`/api/v1/room/${currentUser._id}`);
      const data = await res.json();
      setRoom(data);
      if (data.success === false) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //deleting room
  const handelRoomDelete = async (roomId) => {
    try {
      const res = await fetch(`api/v1/deleteroom/${roomId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setRoom((prev) => prev.filter((rooms) => rooms._id !== roomId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center my-7 w-full px-10">
        <div className="flex flex-col items-center gap-2">
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
            className="h-32 w-32 shadow-xl mt-10 mx-auto cursor-pointer object-cover rounded-xl"
          />
          <span
            onClick={() => fileRef.current.click()}
            className="cursor-pointer"
          >
            <FaEdit size={24} />
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col w-full mx-20">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="border-solid border-2 outline-none rounded-md px-2 py-1 h-12 text-xl"
            defaultValue={currentUser.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="border-solid border-2 outline-none rounded-md px-2 py-1 h-12 text-xl"
            defaultValue={currentUser.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="border-solid border-2 outline-none rounded-md px-2 py-1 h-12 text-xl"
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            className="border-solid border-2 outline-none rounded-md px-2 py-1 h-12 text-xl"
            defaultValue={currentUser.address}
            onChange={handleChange}
          />
          <label htmlFor="phoneNumber">PhoneNumber</label>
          <div className="flex items-center border-solid border-2 outline-none rounded-md px-2 py-1 h-12 text-xl">
            <span className="text-sky-500 mr-1">+977</span>
            <input
              type="text"
              id="phoneNumber"
              className="flex-grow outline-none"
              defaultValue={currentUser.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="my-5 rounded-md disabled:opacity-80 px-4 py-2 flex items-center justify-center bg-sky-400 text-white"
          >
            <FaUserEdit className="inline-block mr-2 text-2xl " color="white" />
            Update
          </button>
        </form>
        <div className="mx-auto">
          <button
            type="button"
            onClick={handleDeleteUser}
            className="pointer bg-red-600 p-1 rounded-xl text-white"
          >
            <FaUserTimes className="inline-block mr-2" color="white" />
            Delete Account
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {room &&
            room.length > 0 &&
            room.map((list) => (
              <div
                key={list._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg"
              >
                <img
                  src={list.imageUrls}
                  alt=""
                  className="h-48 w-full object-cover object-center"
                />
                <div className="p-4">
                  <Link to={`/room/${list._id}`}>
                    <h2 className="text-xl font-semibold text-slate-700 truncate">
                      {list.name}
                    </h2>
                  </Link>
                  <p className="text-gray-600 truncate">{list.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <Link to={`/updateroom/${list._id}`}>
                      <button className="text-emerald-700 flex items-center">
                        <FaUserEdit className="inline-block mr-2" />
                        Edit
                      </button>
                    </Link>
                    <button
                      className="text-red-700 flex items-center"
                      onClick={() => handelRoomDelete(list._id)}
                    >
                      <FaTrash className="inline-block mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
