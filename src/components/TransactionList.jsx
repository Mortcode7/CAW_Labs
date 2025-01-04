import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const TransactionList = () => {
  const { transactions, deleteTransaction, updateTransaction } = useTransactions();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setEditForm(transaction); // Populate the form with the existing transaction details
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTransaction(editingId, { ...editForm, amount: parseFloat(editForm.amount) });

    setEditingId(null); // Exit edit mode
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            {editingId === transaction.id ? (
              // Edit Mode
              <form onSubmit={handleEditSubmit} className="edit-form">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="Name"
                />
                <input
                  type="number"
                  value={editForm.amount}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  placeholder="Amount"
                />
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                />
                <select
                  value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                >
                  <option value="Groceries">Groceries</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Income"
                      checked={editForm.type === 'Income'}
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    />
                    Income
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Expense"
                      checked={editForm.type === 'Expense'}
                      onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    />
                    Expense
                  </label>
                </div>
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>
                  Cancel
                </button>
              </form>
            ) : (
              // View Mode
              <>
                <div className="transaction-details">
                  <p><strong>Name:</strong> {transaction.name}</p>
                  <p><strong>Amount:</strong> {transaction.amount} DZD</p>
                  <p><strong>Date:</strong> {transaction.date}</p>
                  <p><strong>Category:</strong> {transaction.category}</p>
                  <p><strong>Type:</strong> {transaction.type}</p>
                </div>
                <div className="transaction-actions">
                  <button onClick={() => handleEditClick(transaction)}>Edit</button>
                  <button className="delete-button" onClick={() => deleteTransaction(transaction.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
