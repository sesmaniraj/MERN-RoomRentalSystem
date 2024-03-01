import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../ListingItem";
import { useSelector } from "react-redux";

const RecommendedRoom = () => {
  const [offerListings, setOfferListings] = useState([]);
  SwiperCore.use([Navigation]);

  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser._id);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/v1/getbyuserdata/${currentUser._id}`);
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
      <div className="mt-3">
        {offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Recommended Rooms
              </h2>
            </div>
            <div className="flex gap-2 mx-auto">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendedRoom;
