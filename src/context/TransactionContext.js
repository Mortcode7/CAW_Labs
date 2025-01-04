import React, { createContext, useState, useContext } from "react";

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  const recalculateTotals = (updatedTransactions) => {
    const income = updatedTransactions
      .filter((t) => t.type === "Income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = updatedTransactions
      .filter((t) => t.type === "Expense")
      .reduce((sum, t) => sum + t.amount, 0);

    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);
  };

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    recalculateTotals(updatedTransactions);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
    recalculateTotals(updatedTransactions);
  };

  const updateTransaction = (id, updatedTransaction) => {
    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === id
        ? { ...transaction, ...updatedTransaction }
        : transaction
    );
    setTransactions(updatedTransactions);
    recalculateTotals(updatedTransactions);
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
        updateTransaction, // Updated to handle recalculations
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
