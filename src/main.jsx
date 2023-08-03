import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import { createLogger } from "redux-logger";
import calendarReducer from "./store/reducers/calendar.js";
import userReducer from "./store/reducers/user.js";
import { QueryClient, QueryClientProvider } from "react-query";
import eventsReducer from "./store/reducers/events.js";

const rootReducer = combineReducers({
  calendar: calendarReducer,
  user: userReducer,
  events: eventsReducer,
});

const logger = createLogger();

const queryClient = new QueryClient();

export const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(logger)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// export const pokemonApi = createApi({
//   reducerPath: "pokemonApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
//   endpoints: (builder) => ({
//     getPokemonByName: builder.query({
//       query: (name) => `pokemon/${name}`,
//     }),
//   }),
// });
