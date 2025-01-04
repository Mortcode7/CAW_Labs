import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TransactionProvider } from "./context/TransactionContext.js";
import "./styles/App.css";

ReactDOM.render(
  <TransactionProvider>
    <App />
  </TransactionProvider>,
  document.getElementById("root")
);
