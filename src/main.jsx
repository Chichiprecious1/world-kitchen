// src/main.jsx
// ─────────────────────────────────────────────
// This is the very first file React reads.
// It finds the <div id="root"> in index.html
// and mounts (attaches) your whole app inside it.
// ─────────────────────────────────────────────
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
