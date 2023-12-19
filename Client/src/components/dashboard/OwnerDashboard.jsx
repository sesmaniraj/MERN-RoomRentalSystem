import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [image, setImage] = useState();
  const navigate = useNavigate();

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setLocation([latitude, longitude]);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };
  const handleClick = () => {
    getLocation();
  };

  console.log(location);

  const handleRoomCheckboxChange = () => {
    setSelectedOption("Room");
  };

  const handleRentCheckboxChange = () => {
    setSelectedOption("Rent");
  };
  const handleSubmit = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Owner Dashboard</h1>
      <div className="flex items-center">
        <form method="Post" className="ow-dash-form">
          <label>
            <h2>Choose Rent For</h2>
            <input
              type="checkbox"
              checked={selectedOption === "Room"}
              onChange={handleRoomCheckboxChange}
            />
            Room
            <input
              type="checkbox"
              checked={selectedOption === "Rent"}
              onChange={handleRentCheckboxChange}
            />
            Rent
          </label>

          <label htmlFor="file">
            <h2>Add Images</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.image);
              }}
              value={image}
            />
          </label>

          <label htmlFor="map">
            <h2>Choose Location</h2>
            <label>
              <button type="button" onClick={getLocation}>
                Get Location
              </button>
            </label>
            <div className="map-container">
              {location && (
                <MapContainer
                  id="map"
                  center={location}
                  zoom={13}
                  style={{ height: "300px", width: "30rem" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={location}>
                    <Popup>Home</Popup>
                  </Marker>
                </MapContainer>
              )}
            </div>
          </label>
          <button type="submit" className="post-btn" onClick={handleSubmit}>
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default OwnerDashboard;
