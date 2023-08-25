import dayjs from "dayjs";
import { ADD_EVENTS, USER_SELECTED_DATE } from "../actions";
import {
  WEEKDAYVALUES,
  filterEvents,
  getDailyIntervalEvents,
  getWeeklyIntervalEvents,
  weeksBetween,
} from "./utils";
const INITIAL_EVENTS = {
  eventList: [],
  selectedDateEventList: [],
};

const getRecurrenceStatusList = (event) => {
  return event.recurrence[0].split(";").reduce((obj, item) => {
    const splitedItem = item.split("=");
    return { ...obj, [splitedItem[0]]: splitedItem[1] };
  }, {});
};

const dailyRrule = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
}) => {
  if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
    return getDailyIntervalEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
    });
  } else {
    return filterEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
    });
  }
};

const weeklyRrule = ({
  recurrenceStatusList,
  event,
  eventStartAt,
  userSelected,
  weekDifference,
}) => {
  const Weekdays = recurrenceStatusList["BYDAY"];
  if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
    return getWeeklyIntervalEvents({
      recurrenceStatusList,
      event,
      eventStartAt,
      Weekdays,
      userSelected,
      dateDifference: weekDifference,
    });
  } else if (Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])) {
    return filterEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference: weekDifference,
      eventStartAt,
    });
  }
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

      const resetEventStartAtTime = new Date(
        dayjs(eventStartAt).startOf("day")
      );

      const weekDifference =
        weeksBetween(resetEventStartAtTime, userSelected) - 1;

      if (recurrenceStatusList["RRULE:FREQ"] === "DAILY") {
        return dailyRrule({
          recurrenceStatusList,
          event,
          dateDifference: dayDifference,
          userSelected,
        });
      }

      if (recurrenceStatusList["RRULE:FREQ"] === "WEEKLY") {
        return weeklyRrule({
          recurrenceStatusList,
          event,
          weekDifference,
          userSelected,
          eventStartAt: resetEventStartAtTime,
        });
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
