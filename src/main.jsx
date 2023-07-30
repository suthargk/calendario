import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import calendarReducer from "./store/reducers/index.js";

const rootReducer = combineReducers({
  calendar: calendarReducer,
});

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
