import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components globally
ChartJS.register(ArcElement, Tooltip, Legend);

const IncomeExpenseChart = ({ income, expenses }) => {
  const total = income + expenses;

  // Chart data
  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["rgb(40, 227, 155)", "rgb(255, 33, 85)"],
        hoverBackgroundColor: ["rgb(32, 185, 126)", "rgb(214, 28, 72)"],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} DZD (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="income-expense-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;
