import React from "react";
import "../styles/Cart.css";

function Cart({ items }) {
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {items.length === 0 ? (
        <p>No items added yet.</p>
      ) : (
        <div>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Total Price: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
