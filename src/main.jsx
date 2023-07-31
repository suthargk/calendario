import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import calendarReducer from "./store/reducers/calendar.js";
import userReducer from "./store/reducers/user.js";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  user: userReducer,
});

const logger = createLogger();

const store = createStore(rootReducer, undefined, applyMiddleware(logger));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
