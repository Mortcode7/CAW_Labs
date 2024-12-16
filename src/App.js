import React, { useState } from "react";
import MenuDisplay from "./components/MenuDisplay";
import Cart from "./components/Cart";
import Order from "./components/Order";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Function to add items to the cart
  const addToCart = (item, quantity, size) => {
    const updatedCartItems = [...cartItems];
    const existingItem = updatedCartItems.find(
      (cartItem) => cartItem.id === item.id && cartItem.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      updatedCartItems.push({ ...item, quantity, size });
    }

    setCartItems(updatedCartItems);
  };

  return (
    <div className="App">
      <h1>Restaurant Menu</h1>
      {/* Pass cartItems and addToCart function to MenuDisplay */}
      <MenuDisplay onAddToCart={addToCart} />
      {/* Render Cart component and pass cartItems */}
      <Cart items={cartItems} />
      <Order />
    </div>
  );
}

export default App;
