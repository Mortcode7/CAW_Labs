import React, { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    if (transaction.type === "Income") {
      setTotalIncome((prev) => prev + transaction.amount);
      setBalance((prev) => prev + transaction.amount);
    } else {
      setTotalExpenses((prev) => prev + transaction.amount);
      setBalance((prev) => prev - transaction.amount);
    }
  };

  const deleteTransaction = (id) => {
    const transaction = transactions.find((t) => t.id === id);
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    if (transaction.type === "Income") {
      setTotalIncome((prev) => prev - transaction.amount);
      setBalance((prev) => prev - transaction.amount);
    } else {
      setTotalExpenses((prev) => prev - transaction.amount);
      setBalance((prev) => prev + transaction.amount);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpenses,
        balance,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
