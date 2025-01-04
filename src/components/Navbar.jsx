import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/add">Add Transaction</Link>
      <Link to="/list">Transaction List</Link>
      <Link to="/reports">Visual Reports</Link>
    </nav>
  );
};

export default Navbar;