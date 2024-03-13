import { FaCheck, FaTimes } from "react-icons/fa";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../../firebase.js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RoomRegister = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    address: "",
    furnished: false,
    parking: false,
    available: false,
    bathrooms: 1,
    bedrooms: 1,
    regularPrice: 50,
    discountedPrice: 50,
    imageUrls: [],
  });

  const handleChange = (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "available" ||
      e.target.id === "furnished"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmitImage = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }

      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageError(false);
        })
        .catch((err) => {
          setImageError("Image upload failed (2mb max)");
        });
    } else {
      setImageError("You can only upload 6 images");
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`upload ${progress} %`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleDeleteImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/v1/registerroom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      navigate("/profile");
      if (data.success === false) {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto my-10 w-full">
      <div className="text-center my-10">
        <h1 className="text-3xl font-bold">Register your room here</h1>
      </div>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex gap-2 my-10 flex-col w-full mx-auto"
      >
        <input
          id="name"
          onChange={handleChange}
          type="text"
          placeholder="Enter Name"
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
          value={formData.name}
          required
        />
        <textarea
          id="description"
          onChange={handleChange}
          type="textarea"
          placeholder="Description"
          value={formData.description}
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
        />
        <input
          id="address"
          onChange={handleChange}
          type="text"
          placeholder="Address"
          value={formData.address}
          className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
          required
        />
        <div className="flex gap-5 ">
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking}
            />
            <span>Parking</span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="available"
              onChange={handleChange}
              checked={formData.available}
            />
            <span>Available</span>
          </div>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              id="furnished"
              onChange={handleChange}
              checked={formData.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.bedrooms}
          />
          <label htmlFor="">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.bathrooms}
          />
          <label htmlFor="">Regular Price (1000 per month)</label>
          <input
            type="number"
            id="regularPrice"
            min="5000"
            max="100000"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.regularPrice}
          />
          <label htmlFor="">Discounted Price (1000 per month)</label>
          <input
            type="number"
            id="discountedPrice"
            min="1000"
            max="100000"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.discountedPrice}
          />
          <label htmlFor="">Images</label>
          <input
            type="file"
            id="images"
            accept="image/*"
            multiple
            className="p-3 border border-gray-300 rounded-lg"
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            type="button"
            onClick={handleSubmitImage}
            className="bg-slate-400 rounded-md p-2 mt-4"
          >
            Upload Image
          </button>
          <p className="text-red-700">{imageError && imageError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex items-center mt-2">
                <img
                  src={url}
                  alt=""
                  className="w-20 h-20 object-contain rounded-lg mr-2"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index)}
                  className="text-red-700"
                >
                  <FaTimes className="inline-block mr-2" />
                  Delete
                </button>
              </div>
            ))}
        </div>
        <button
          type="submit"
          className="bg-sky-400 rounded-md p-2 text-white hover:bg-sky-500 transition duration-300"
        >
          {loading ? "Registering.." : "Register"}
        </button>
        {error && <span className="text-red-700 mx-auto mt-2">{error}</span>}
      </form>
    </div>
  );
};

export default RoomRegister;
