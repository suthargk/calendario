import { ADD_EVENTS, ADD_HOLIDAYS } from "../actions";
import { getColorOnEventCard } from "./utils";
const INITIAL_EVENTS = {
  confirmedEventList: [],
  cancelledEventList: [],
  publicHolidays: [],
};

const applyAddHolidays = (state, action) => {
  const data = action.payload;

  const holidayEventsWithColor = getColorOnEventCard(data);
  return { ...state, publicHolidays: holidayEventsWithColor };
};

const eventsReducer = (state = INITIAL_EVENTS, action) => {
  switch (action.type) {
    case ADD_EVENTS: {
      const events = action.payload;
      const eventsWithColor = getColorOnEventCard(events);

      const confirmedEventList = eventsWithColor.filter(
        (event) => event.status === "confirmed"
      );

      const cancelledEventList = eventsWithColor.filter(
        (event) => event.status === "cancelled"
      );

      return { ...state, confirmedEventList, cancelledEventList };
    }

    case ADD_HOLIDAYS: {
      return applyAddHolidays(state, action);
    }

    default:
      return state;
  }
};

export default eventsReducer;
