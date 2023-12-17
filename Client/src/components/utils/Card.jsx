import React, { useState } from "react";
import "./card.css";

const Card = ({ room }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = () => {
    const newItem = {
      roomNumber: 101,
      type: "Standard",
      price: 100,
      capacity: 2,
    };

    setCartItems([...cartItems, newItem]);
  };

  return (
    <div className="cart-container">
      <div className="room-details">
        <div className="detail-item">
          <span className="detail-label">RoomId:</span>
          <span className="detail-value">{room.roomId}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Description:</span>
          <span className="detail-value">{room.description}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Price:</span>
          <span className="detail-value">{room.price}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Location:</span>
          <span className="detail-value">{room.location}</span>
        </div>
        <button onClick={addToCart}>Book</button>
      </div>
    </div>
  );
};

export default Card;
