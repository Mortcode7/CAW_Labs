import React, { useState } from "react";
import MenuItem from "./MenuItem";
import "../styles/MenuDisplay.css";

const MENU_DATA = {
  Pizza: [
    {
      id: 1,
      name: "Margherita",
      description: "Classic cheese pizza",
      price: 8,
      image: "C:/Users/SURFUCE/OneDrive/Bureau/CAW/pizza_margerrita.jpg",
    },
    {
      id: 2,
      name: "Pepperoni",
      description: "Pepperoni with cheese",
      price: 10,
      image: "C:/Users/SURFUCE/OneDrive/Bureau/CAW/pizza_pepporoni.jpg",
    },
  ],
  Sandwich: [
    {
      id: 3,
      name: "Club Sandwich",
      description: "Grilled chicken sandwich",
      price: 6,
      image: "sandwich.jpg",
    },
  ],
};

function MenuDisplay({ onAddToCart }) {
  const [category, setCategory] = useState("Pizza");

  return (
    <div className="menu-display">
      <nav>
        {Object.keys(MENU_DATA).map((cat) => (
          <button key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </nav>
      <div className="menu-items">
        {MENU_DATA[category].map((item) => (
          <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default MenuDisplay;
