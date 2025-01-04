import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import VisualReports from "./components/VisualReports";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTransactionForm />} />
        <Route path="/list" element={<TransactionList />} />
        <Route path="/reports" element={<VisualReports />} />
      </Routes>
    </Router>
  );
}

export default App;
