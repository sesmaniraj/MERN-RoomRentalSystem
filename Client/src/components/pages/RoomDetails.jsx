import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";

const RoomDetails = () => {
  SwiperCore.use([Navigation]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

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
  }, [params.roomId]);
  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {room && !loading && !error && (
        <div>
          <Swiper navigation>
            {room.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
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
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">{room.name}</p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {room.address}
            </p>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {room.description}
            </p>
            <ul className="text-slate-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
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
          </div>
        </div>
      )}
    </main>
  );
};

export default RoomDetails;
