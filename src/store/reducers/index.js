import { applyMiddleware, combineReducers, createStore } from "redux";
import calendarReducer from "./calendar";
import userReducer from "./user";
import { createLogger } from "redux-logger";
import eventsReducer from "./events";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  user: userReducer,
  events: eventsReducer,
});

const logger = createLogger();

const store = createStore(rootReducer, undefined, applyMiddleware(logger));

export { calendarReducer, userReducer };
export default store;
