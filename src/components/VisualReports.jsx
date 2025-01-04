import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTransactions } from '../context/TransactionContext';
import { saveAs } from 'file-saver'; // For CSV export
import { jsPDF } from 'jspdf'; // For PDF export
import 'jspdf-autotable'; // For table generation in PDF

// Register Chart.js components globally
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VisualReports = () => {
  const { transactions } = useTransactions();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Get unique years from transactions
  const years = [
    ...new Set(transactions.map((t) => new Date(t.date).getFullYear())),
  ];

  // Pie Chart: Category-wise expense distribution
  const categories = [...new Set(transactions.map((t) => t.category))];
  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          transactions
            .filter((t) => t.category === cat)
            .reduce((sum, t) => sum + t.amount, 0)
        ),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Bar Chart: Monthly income vs. expenses for selected year
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const incomeData = Array(12).fill(0);
  const expenseData = Array(12).fill(0);

  transactions
    .filter((t) => new Date(t.date).getFullYear() === selectedYear)
    .forEach((t) => {
      const monthIndex = new Date(t.date).getMonth();
      if (t.type.toLowerCase() === 'income') {
        incomeData[monthIndex] += t.amount;
      } else if (t.type.toLowerCase() === 'expense') {
        expenseData[monthIndex] += t.amount;
      }
    });

  const barData = {
    labels: months,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: '#F44336',
      },
    ],
  };

  // Export as CSV
  const exportToCSV = () => {
    const csvRows = [
      ['Date', 'Name', 'Category', 'Type', 'Amount'], // CSV headers
      ...transactions.map((t) => [
        t.date,
        t.name,
        t.category,
        t.type,
        t.amount,
      ]),
    ];
    const csvContent = csvRows.map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'transactions.csv');
  };

  // Export as PDF
  const exportToPDF = () => {
    const doc = new jsPDF();

    // Add a title to the PDF
    doc.text('Transaction Report', 10, 10);

    // Define the table columns and rows
    const tableColumn = ['Date', 'Name', 'Category', 'Type', 'Amount'];
    const tableRows = transactions.map((t) => [
      t.date,
      t.name,
      t.category,
      t.type,
      t.amount,
    ]);

    // Add the table to the PDF using autoTable
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Position the table below the title
    });

    // Save the generated PDF
    doc.save('transactions.pdf');
  };

  return (
    <div className="visual-reports">
      {/* Year Selector */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label htmlFor="year-selector" style={{ fontWeight: 'bold', marginRight: '10px' }}>
          Select Year:
        </label>
        <select
          id="year-selector"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Pie Chart Section */}
      <div style={{ width: '400px', height: '400px', margin: '20px auto' }}>
        <h2 style={{ textAlign: 'center',color: '#07407c' }} >Expense Distribution</h2>
        <Pie data={pieData} />
      </div>

      {/* Bar Chart Section */}
      <div style={{ width: '80%', margin: '40px auto' }}>
        <h2 style={{ textAlign: 'center' ,color: '#07407c'}}>
          Monthly Income vs Expenses ({selectedYear})
        </h2>
        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
            },
          }}
        />
      </div>

      {/* Export Options */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button onClick={exportToCSV} style={{ marginRight: '10px', padding: '10px 20px' }}>
          Export as CSV
        </button>
        <button onClick={exportToPDF} style={{ padding: '10px 20px' }}>
          Export as PDF
        </button>
      </div>
    </div>
  );
};

export default VisualReports;
