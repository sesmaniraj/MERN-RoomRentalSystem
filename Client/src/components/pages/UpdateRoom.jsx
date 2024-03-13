import React, { useEffect, useState } from "react";
import { FaBed, FaBath, FaUpload, FaTrash } from "react-icons/fa";
import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase.js";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateRoom = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
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
    if (["parking", "furnished", "available"].includes(e.target.id)) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else if (["number", "text", "textarea"].includes(e.target.type)) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  useEffect(() => {
    const fetchRoom = async () => {
      const roomId = params.roomId;
      const res = await fetch(`/api/v1/rooms/${roomId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(error.message);
      }
      setFormData(data);
    };
    fetchRoom();
  }, []);

  const handleSubmitImage = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      const promises = files.map((file) => storeImage(file));

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
          console.log(`Upload progress: ${progress}%`);
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
      const res = await fetch(`/api/v1/updateroom/${params.roomId}`, {
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
      navigate("/home");
      toast.success("Room Updated SuccessFully 1");
      if (data.success === false) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-center  w-full">
        <div className="bg-gray-800 text-white p-4 flex justify-between">
          <span>Room Rental System</span>
          <span>Welcome Admin</span>
        </div>
        <h1 className="text-3xl font-bold mt-5">Update your room here</h1>
      </div>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex gap-2 my-10 flex-col w-full px-10"
      >
        {/* Name Input */}
        <div className="flex items-center mb-4">
          <label htmlFor="name" className="mr-4">
            <span>Name</span>
          </label>
          <input
            id="name"
            onChange={handleChange}
            type="text"
            placeholder="Enter Name"
            className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md flex-grow"
            value={formData.name}
            required
          />
        </div>

        {/* Description Textarea */}
        <div className="flex items-center mb-4">
          <label htmlFor="description" className="mr-4">
            <span>Description</span>
          </label>
          <textarea
            id="description"
            onChange={handleChange}
            type="textarea"
            placeholder="Description"
            value={formData.description}
            className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md flex-grow"
          />
        </div>

        {/* Address Input */}
        <div className="flex items-center mb-4">
          <label htmlFor="address" className="mr-4">
            <span>Address</span>
          </label>
          <input
            id="address"
            onChange={handleChange}
            type="text"
            placeholder="Address"
            value={formData.address}
            className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md flex-grow"
            required
          />
        </div>

        {/* Checkbox Group */}
        <div className="flex gap-5 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking}
            />
            <span>Parking</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="available"
              onChange={handleChange}
              checked={formData.available}
            />
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="furnished"
              onChange={handleChange}
              checked={formData.furnished}
            />
            <span>Furnished</span>
          </div>
        </div>

        {/* Numeric Inputs */}
        <div className="flex flex-col mb-4">
          <div className="flex items-center gap-2">
            <label htmlFor="bedrooms" className="mr-4">
              <FaBed />
              <span>Bedrooms</span>
            </label>
            <input
              type="number"
              id="bedrooms"
              min="1"
              max="10"
              className="p-3 border border-gray-300 rounded-lg flex-grow"
              onChange={handleChange}
              value={formData.bedrooms}
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="bathrooms" className="mr-4">
              <FaBath />
              <span>Bathrooms</span>
            </label>
            <input
              type="number"
              id="bathrooms"
              min="1"
              max="10"
              className="p-3 border border-gray-300 rounded-lg flex-grow"
              onChange={handleChange}
              value={formData.bathrooms}
            />
          </div>
        </div>

        {/* Price Inputs */}
        <div className="flex flex-col mb-4">
          <label htmlFor="regularPrice" className="mb-2">
            Regular Price (1000 per month)
          </label>
          <input
            type="number"
            id="regularPrice"
            className="p-3 border border-gray-300 rounded-lg mb-4"
            onChange={handleChange}
            value={formData.regularPrice}
          />

          <label htmlFor="discountedPrice" className="mb-2">
            Discounted Price (1000 per month)
          </label>
          <input
            type="number"
            id="discountedPrice"
            className="p-3 border border-gray-300 rounded-lg mb-4"
            onChange={handleChange}
            value={formData.discountedPrice}
          />
        </div>

        {/* Image Upload Section */}
        <div className="flex flex-col mb-4">
          <label htmlFor="images" className="mb-2">
            Images
          </label>
          <div className="flex items-center gap-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border border-gray-300 rounded-lg flex-grow"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              onClick={handleSubmitImage}
              className="bg-slate-400 rounded-md p-2"
            >
              <FaUpload />
              <span className="ml-2">Upload Image</span>
            </button>
          </div>
          <p className="text-red-700 mt-2">{imageError && imageError}</p>
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
                  className="text-red-700 flex items-center"
                  onClick={() => handleDeleteImage(index)}
                >
                  <FaTrash />
                  <span className="ml-1">Delete</span>
                </button>
              </div>
            ))}
        </div>

        {/* Submit button */}
        <button type="submit" className="bg-sky-400 rounded-md p-2">
          {loading ? "Updating" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
