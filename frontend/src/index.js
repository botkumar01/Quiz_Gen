import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/styles.css"; 
import Header from "./components/Header/Header.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Header />
    <App />
  </>
);
