import { ADD_EVENTS } from "../actions";

const INITIAL_EVENTS = {
  eventList: [],
};

const eventsReducer = (state = INITIAL_EVENTS, action) => {
  switch (action.type) {
    case ADD_EVENTS: {
      const events = action.payload;
      return { ...state, eventList: events.items };
    }
    default:
      return state;
  }
};

export default eventsReducer;
