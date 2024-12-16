import React, { useState } from "react";
import "../styles/MenuItem.css";

function MenuItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Small");

  const handleAddToCart = () => {
    onAddToCart(item, quantity, size);
  };

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>${item.price}</p>
      
      {/* Size selection */}
      <label htmlFor="size">Size:</label>
      <select
        id="size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <option value="Small">Small</option>
        <option value="Medium">Medium</option>
        <option value="Large">Large</option>
      </select>

      {/* Quantity selection */}
      <label htmlFor="quantity">Quantity:</label>
      <input
        id="quantity"
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
