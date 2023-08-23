import dayjs from "dayjs";
import { ADD_EVENTS, USER_SELECTED_DATE } from "../actions";
import {
  WEEKDAYVALUES,
  filterEvents,
  getDailyIntervalEvents,
  getWeeklyIntervalEvents,
} from "./utils";
const INITIAL_EVENTS = {
  eventList: [],
  selectedDateEventList: [],
};

const applySelectedDate = (state, action) => {
  const userSelected = action.payload;

  const userSelectedDateEvents = state.eventList.filter((event) => {
    const eventStartAt = new Date(event.start.dateTime);
    if (event.recurrence) {
      const recurrenceStatusList = event.recurrence[0]
        .split(";")
        .reduce((obj, item) => {
          const splitedItem = item.split("=");
          return { ...obj, [splitedItem[0]]: splitedItem[1] };
        }, {});

      const dateDifference = dayjs(userSelected).diff(
        dayjs(eventStartAt).startOf("day"),
        "day"
      ); // 7

      if (recurrenceStatusList["RRULE:FREQ"] === "DAILY") {
        if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
          return getDailyIntervalEvents(
            recurrenceStatusList,
            event,
            userSelected,
            dateDifference
          );
        } else {
          return filterEvents(
            recurrenceStatusList,
            event,
            userSelected,
            dateDifference
          );
        }
      }

      if (recurrenceStatusList["RRULE:FREQ"] === "WEEKLY") {
        const Weekdays = recurrenceStatusList["BYDAY"];
        if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
          return getWeeklyIntervalEvents(
            recurrenceStatusList,
            event,
            eventStartAt,
            Weekdays,
            userSelected
          );
        } else if (Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])) {
          return event;
        }
      }

      if (
        new Date(event.start.dateTime).toLocaleDateString() ===
        new Date(userSelected).toLocaleDateString()
      )
        return event;
    }
  });

  return { ...state, selectedDateEventList: userSelectedDateEvents };
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
