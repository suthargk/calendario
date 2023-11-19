import "./index.css";

import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./store/reducers/index.js";

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
