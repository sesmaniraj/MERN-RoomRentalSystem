import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";

const RoomDetails = () => {
  SwiperCore.use([Navigation]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(null);
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
      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}
      {room && !loading && !error && (
        <>
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
        </>
      )}
    </main>
  );
};

export default RoomDetails;
