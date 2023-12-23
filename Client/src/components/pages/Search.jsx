import React from "react";

const Search = () => {
  return (
    <div className="flex ">
      <div className="p-5">
        <form action="">
          <div>
            <label className="">Search:</label>
            <input
              type="text"
              id="searchterm"
              placeholder="search"
              className="border-solid border-2 p-1.5 border-sky-500 outline-none rounded-md"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Facilities</label>
            <label htmlFor="">Parking</label>
            <input type="checkbox" id="parking" className="w-5" />
            <label htmlFor="">Furnished</label>
            <input type="checkbox" id="furnished" className="w-5" />
            <label htmlFor="">Available</label>
            <input type="checkbox" id="available" className="w-5" />
          </div>
          <div>
            <label htmlFor="">Sort:</label>
            <select name="" id="sort_order" className="border rounded-lg p-3">
              <option value="">Price High To low</option>
              <option value="">Price Low to High</option>
              <option value="">Latest</option>
              <option value="">Oldest</option>
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
