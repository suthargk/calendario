import dayjs from "dayjs";
import { ADD_EVENTS, ADD_HOLIDAYS, USER_SELECTED_DATE } from "../actions";
import {
  colors,
  getColorOnEventCard,
  getDailyRruleEvents,
  getMonthDifference,
  getMonthlyRruleEvents,
  getWeeklyRruleEvents,
  getYearlyRruleEvents,
  weeksBetween,
} from "./utils";
const INITIAL_EVENTS = {
  eventList: [],
  selectedDateEventList: [],
  publicHolidays: [],
};

const getRecurrenceStatusList = (event) => {
  return event.recurrence[0].split(";").reduce(
    (obj, item) => {
      const splitedItem = item.split("=");
      return { ...obj, [splitedItem[0]]: splitedItem[1] };
    },
    { INTERVAL: "1" }
  );
};

const applySelectedDate = (state, action) => {
  const userSelected = action.payload;

  const userSelectedDateEvents = state.eventList.filter((event) => {
    const eventStartAt = new Date(event.start.dateTime);
    if (event.recurrence) {
      const recurrenceStatusList = getRecurrenceStatusList(event);
      const dayDifference = dayjs(userSelected).diff(
        dayjs(eventStartAt).startOf("day"),
        "day"
      );

      switch (recurrenceStatusList["RRULE:FREQ"]) {
        case "DAILY": {
          return getDailyRruleEvents({
            recurrenceStatusList,
            event,
            userSelected,
            dateDifference: dayDifference,
          });
        }
        case "WEEKLY": {
          const resetEventStartAtTime = new Date(
            dayjs(eventStartAt).startOf("day")
          );
          const weekDifference = weeksBetween(
            resetEventStartAtTime,
            userSelected
          );

          return getWeeklyRruleEvents({
            recurrenceStatusList,
            event,
            eventStartAt: resetEventStartAtTime,
            Weekdays,
            userSelected,
            dayDifference,
            dateDifference: weekDifference,
          });
        }

        case "MONTHLY": {
          const monthDifference = getMonthDifference(
            eventStartAt,
            userSelected
          );

          return getMonthlyRruleEvents({
            recurrenceStatusList,
            event,
            userSelected,
            dateDifference: monthDifference,
          });
        }

        case "YEARLY": {
          const yearDifference =
            userSelected.getFullYear() -
            new Date(event.start.dateTime).getFullYear();

          return getYearlyRruleEvents({
            event,
            recurrenceStatusList,
            userSelected,
            dateDifference: yearDifference,
          });
        }
      }
    }

    if (
      new Date(event.start.dateTime).toLocaleDateString() ===
      new Date(userSelected).toLocaleDateString()
    )
      return event;
  });

  return { ...state, selectedDateEventList: userSelectedDateEvents };
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
      return { ...state, eventList: eventsWithColor };
    }

    case USER_SELECTED_DATE: {
      return applySelectedDate(state, action);
    }

    case ADD_HOLIDAYS: {
      return applyAddHolidays(state, action);
    }

    default:
      return state;
  }
};

export default eventsReducer;
