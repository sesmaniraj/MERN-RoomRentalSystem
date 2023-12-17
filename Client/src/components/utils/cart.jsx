import React from "react";

const Cart = ({ cartItems }) => {
  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.type} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
