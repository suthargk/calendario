import dayjs from "dayjs";
import { ADD_EVENTS, USER_SELECTED_DATE } from "../actions";

const INITIAL_EVENTS = {
  eventList: [],
  userSelectedDateEventList: [],
};

const applySelectedDate = (state, action) => {
  const userSelectedDate = action.payload;

  const userSelectedDateEvents = state.eventList.filter((event) => {
    const eventDate = dayjs(event.start.dateTime);
    return (
      eventDate.date() === userSelectedDate.date() &&
      eventDate.month() === userSelectedDate.month() &&
      eventDate.year() === userSelectedDate.year()
    );
  });

  return { ...state, userSelectedDateEventList: userSelectedDateEvents };
};

const eventsReducer = (state = INITIAL_EVENTS, action) => {
  switch (action.type) {
    case ADD_EVENTS: {
      const events = action.payload;
      return { ...state, eventList: events.items };
    }

    case USER_SELECTED_DATE: {
      return applySelectedDate(state, action);
    }

    default:
      return state;
  }
};

export default eventsReducer;
