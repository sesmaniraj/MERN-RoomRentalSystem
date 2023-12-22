import {
  getStorage,
  uploadBytesResumable,
  ref,
  getDownloadURL,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../../firebase.js";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UpdateRoom = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageError, setImageError] = useState(false);
  const [files, setFiles] = useState([]);
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

  console.log(formData);

  const handleChange = (e) => {
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "available"
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

  const handleSubmitImage = (e) => {
    console.log("hell0");
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
      setImageError("You can only upload 6");
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
      imageUrls: formData.imageUrls.filter((_, i) => i != index),
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
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
      if (data.success === false) {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="text-center my-10">
        <h1>Update your room here</h1>
      </div>
      <form
        action=""
        onSubmit={submitHandler}
        className="flex gap-2 my-10  flex-col w-6/12 mx-auto"
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
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="parking"
              onChange={handleChange}
              checked={formData.parking}
            />
            <span>Parking</span>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              id="available"
              onChange={handleChange}
              checked={formData.available}
            />
            <span>Available</span>
          </div>
          <div className="flex gap-2">
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
          <label htmlFor="">BedRooms</label>
          <input
            type="number"
            id="bedrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.bedrooms}
          />
          <label htmlFor="">BathRooms</label>
          <input
            type="number"
            id="bathrooms"
            min="1"
            max="10"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.bathrooms}
          />
          <label htmlFor="">RegularPrice(1000 per month)</label>
          <input
            type="number"
            id="regularPrice"
            className="p-3 border border-gray-300 rounded-lg"
            onChange={handleChange}
            value={formData.regularPrice}
          />
          <label htmlFor="">DiscountedPrice(1000 per month)</label>
          <input
            type="number"
            id="discountedPrice"
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
            className="bg-slate-400 rounded-md p-2 m-10"
          >
            Upload Image
          </button>
          <p className="text-red-700">{imageError && imageError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div key={url} className="flex">
                <img
                  src={url}
                  alt=""
                  className="w-30 h-30 object-contain rounded-lg "
                />
                <button
                  type="button"
                  className="text-red-700"
                  onClick={() => handleDeleteImage(index)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
        <button type="submit" className="bg-sky-400 rounded-md p-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateRoom;
