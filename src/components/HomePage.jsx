import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import TransactionPopup from "./TransactionPopup"; // Import the popup component
import IncomeExpenseChart from "./IncomeExpenseChart"; // New circular chart component

const HomePage = () => {
  const { totalIncome, totalExpenses, transactions,balance } = useTransactions();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closePopup = () => {
    setSelectedTransaction(null);
  };

  return (
    <div className="home-page">
      <h1>Welcome to Masroofy Budget Tracker</h1>

      {/* Summary Section */}
      <div className="summary">
        <div className="summary-box income-box">
          <h3>Total Income</h3>
          <p className="highlight-text" style={{ color: "rgb(40, 227, 155)" }}>
            {totalIncome} DZD
          </p>
        </div>
        <div className="summary-box expense-box">
          <h3>Total Expenses</h3>
          <p className="highlight-text" style={{ color: "rgb(255, 33, 85)" }}>
            {totalExpenses} DZD
          </p>
        </div>
        <div>
        <h3>Balance: {balance} DZD</h3>
        </div>
      </div>

      {/* Income vs Expenses Section */}
      <div className="income-expense-container">
        <div className="chart-container">
          <h2>Income vs Expenses</h2>
          <IncomeExpenseChart income={totalIncome} expenses={totalExpenses} />
        </div>
        <div className="transaction-history">
          <h2>Transactions History</h2>
          <ul className="transaction-list">
            {transactions.map((transaction) => (
              <li
                key={transaction.id}
                className="transaction-item-h"
                onClick={() => handleTransactionClick(transaction)}
              >
                <div className="transaction-summary">
                  <p>{transaction.name}</p>
                  <p
                    className="highlight-text"
                    style={{
                      color:
                        transaction.type === "Income" ? "rgb(40, 227, 155)" : "rgb(255, 33, 85)",
                    }}
                  >
                    {transaction.amount} DZD
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Transaction Popup */}
      {selectedTransaction && (
        <TransactionPopup
          transaction={selectedTransaction}
          onClose={closePopup}
        />
      )}
    </div>
  );
};

export default HomePage;
