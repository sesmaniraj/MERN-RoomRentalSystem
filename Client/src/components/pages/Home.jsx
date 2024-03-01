import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../ListingItem";
import Footer from "./Footer";
import RecommendedRoom from "./RecommendedRoom";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/v1/getallroom");
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
      {/* Top Section */}
      <div className="flex flex-col gap-6 p-10 md:p-28 max-w-6xl mx-auto text-center">
        <h1 className="text-3xl lg:text-6xl font-bold text-slate-700">
          Room khojau <span className="text-sky-500">Hami xau</span>
          <br />
          samjhanaus
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          RRS is the best place to find
          <br />
          All quality of room
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's search your best room here
        </Link>
      </div>

      {/* Listing Results Section */}
      <div className="mb-5">
        {offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">
                Our rooms
              </h2>
              <Link
                to="/search?offer=true"
                className="text-sm text-blue-800 hover:underline"
              >
                Search more here
              </Link>
            </div>
            <div className="flex  flex-wrap  gap-2 ">
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <RecommendedRoom />
      <Footer />
    </div>
  );
}
