import React from "react";

const Sidebar = () => {
  return (
    <div className="bg-gray-200 p-4">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>
      <form>
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1">
            Location:
          </label>
          <input
            type="text"
            id="location"
            name="location"
            className="w-full px-2 py-1 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">
            Price Range:
          </label>
          <div className="flex">
            <input
              type="number"
              id="min-price"
              name="min-price"
              placeholder="Min"
              className="w-1/2 mr-1 px-2 py-1 border rounded"
            />
            <span className="mx-1">-</span>
            <input
              type="number"
              id="max-price"
              name="max-price"
              placeholder="Max"
              className="w-1/2 ml-1 px-2 py-1 border rounded"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="amenities" className="block mb-1">
            Amenities:
          </label>
          <select
            id="amenities"
            name="amenities"
            className="w-full px-2 py-1 border rounded"
          >
            <option value="">Select</option>
            <option value="wifi">WiFi</option>
            <option value="kitchen">Kitchen</option>
            <option value="parking">Parking</option>
            <option value="ac">Air Conditioning</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
