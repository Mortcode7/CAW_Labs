import React, { useState } from 'react';
import { useTransactions } from '../context/TransactionContext';

const AddTransactionForm = () => {
  const { addTransaction } = useTransactions();
  const [form, setForm] = useState({
    name: '',
    amount: 0,
    date: '',
    category: '',
    type: 'Income',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ ...form, id: Date.now(), amount: parseFloat(form.amount) });
    setForm({ name: '', amount: 0, date: '', category: '', type: 'Income' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <select
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Groceries">Groceries</option>
        <option value="Transportation">Transportation</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <div>
        <label>
          <input
            type="radio"
            value="Income"
            checked={form.type === 'Income'}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          Income
        </label>
        <label>
          <input
            type="radio"
            value="Expense"
            checked={form.type === 'Expense'}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          />
          Expense
        </label>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransactionForm;