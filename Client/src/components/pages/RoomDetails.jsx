import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

Modal.setAppElement("#root");

const RoomDetails = () => {
  SwiperCore.use([Navigation]);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("notBooked");

  const params = useParams();
  const [bookingformData, setBookingFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
  });
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/rooms/${params.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
        }
        setRoom(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchRoom();
  }, [params.id]);

  const handleBookNow = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setBookingFormData({ ...bookingformData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/v1/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: bookingformData.name,
        address: bookingformData.address,
        phoneNumber: bookingformData.phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Booking successful:", data);
        setIsModalOpen(false);
        setBookingStatus("booked");
      })

      .catch((error) => {
        console.error("Error booking room:", error);
      });
  };
  return (
    <main className="max-w-4xl mx-auto p-3 my-7 ">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {room && !loading && !error && (
        <div className="z-0">
          <Swiper navigation>
            {room.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] bg-cover bg-center"
                  style={{ backgroundImage: `url(${url})` }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-16 right-3 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-50 right-10 z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col mt-6 gap-4 text-slate-900">
            <p className="text-2xl font-semibold">{room.name}</p>
            <p className="flex items-center gap-2 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {room.address}
            </p>
            <p className="font-semibold">
              <span className="text-black">Description - </span>
              {room.description}
            </p>
            <ul className="font-semibold text-sm flex flex-wrap gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {room.bedrooms > 1
                  ? `${room.bedrooms} beds `
                  : `${room.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {room.bathrooms > 1
                  ? `${room.bathrooms} baths `
                  : `${room.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {room.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {room.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            {bookingStatus === "notBooked" && (
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleBookNow}
              >
                Book Now
              </button>
            )}
            {bookingStatus === "booked" && (
              <p className="text-green-500 font-semibold">Booked!</p>
            )}
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg z-50"
            overlayClassName="overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"
          >
            <h2 className="text-2xl font-semibold mb-4">Book Now</h2>
            <div>
              <h2>Book Room: {room.name}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block font-semibold">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block font-semibold">
                    Address:
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block font-semibold">
                    Phone Number:
                  </label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Book Now
                </button>
              </form>
            </div>
          </Modal>
        </div>
      )}
    </main>
  );
};

export default RoomDetails;
