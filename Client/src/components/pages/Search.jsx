import React, { useEffect, useState } from "react";
import { useFetcher, useNavigate } from "react-router-dom";

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    parking: false,
    furnished: false,
    sort: "created_at",
    order: "desc",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState([]);
  console.log(room);
  console.log(sidebarData);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "available"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search/${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl,
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchData = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/get?${searchQuery}`);
      const data = await res.json();
      setRoom(data);
      setLoading(false);
    };
    fetchData();
  }, [location.search]);
  return (
    <div className="flex ">
      <div className="p-5">
        <form action="" onSubmit={submitHandler}>
          <div>
            <label className="">Search:</label>
            <input
              type="text"
              id="searchTerm"
              placeholder="search"
              className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Facilities</label>
            <label htmlFor="">Parking</label>
            <input
              type="checkbox"
              id="parking"
              className="w-5"
              checked={sidebarData.parking}
              onChange={handleChange}
            />
            <label htmlFor="">Furnished</label>
            <input
              type="checkbox"
              id="furnished"
              className="w-5"
              checked={sidebarData.furnished}
              onChange={handleChange}
            />
            <label htmlFor="">Available</label>
            <input
              type="checkbox"
              id="available"
              className="w-5"
              checked={sidebarData.available}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="">Sort:</label>
            <select
              name=""
              id="sort_order"
              className="border rounded-lg p-3"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
            >
              <option value={"regularPrice_desc"}>Price High To low</option>
              <option value={"regularPrice_asc"}>Price Low to High</option>
              <option value={"createdAt_desc"}>Latest</option>
              <option value={"createdAt_asc"}>Oldest</option>
            </select>
          </div>
          <button className="border bg-sky-600 rounded-lg p-3 my-5">
            Search
          </button>
        </form>
      </div>
      <div className="">
        <h1>Rooms:</h1>
      </div>
    </div>
  );
};

export default Search;
