import React from "react";

const TransactionPopup = ({ transaction, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Transaction Details</h2>
        <p><strong>Name:</strong> {transaction.name}</p>
        <p><strong>Amount:</strong> {transaction.amount} DZD</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Category:</strong> {transaction.category}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TransactionPopup;
