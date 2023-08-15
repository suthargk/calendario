import dayjs from "dayjs";
import { ADD_EVENTS, USER_SELECTED_DATE } from "../actions";

const INITIAL_EVENTS = {
  eventList: [],
  selectedDateEventList: [],
};

const WEEKDAYVALUES = {
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
  7: "SU",
};

const filterEvents = (
  recurrenceStatusList,
  event,
  userSelectedDate,
  createAtDate,
  interval = 1
) => {
  if (
    !recurrenceStatusList.hasOwnProperty("UNTIL") &&
    !recurrenceStatusList.hasOwnProperty("COUNT") &&
    userSelectedDate >= createAtDate
  ) {
    return event;
  }

  if (
    recurrenceStatusList.hasOwnProperty("COUNT") &&
    userSelectedDate >= createAtDate &&
    userSelectedDate - createAtDate < recurrenceStatusList["COUNT"] * interval
  ) {
    return event;
  }

  if (
    recurrenceStatusList.hasOwnProperty("UNTIL") &&
    userSelectedDate >= createAtDate &&
    userSelectedDate <=
      Number(recurrenceStatusList["UNTIL"].split("T")[0].slice(-2))
  ) {
    return event;
  }
};

const getDailyIntervalEvents = (
  recurrenceStatusList,
  event,
  userSelectedDate,
  createAtDate
) => {
  const dailyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  if (
    userSelectedDate - createAtDate >= 0 &&
    (userSelectedDate - createAtDate) % dailyIntervalRepeatDays === 0
  ) {
    return filterEvents(
      recurrenceStatusList,
      event,
      userSelectedDate,
      createAtDate,
      Number(recurrenceStatusList["INTERVAL"])
    );
  }
};

const applySelectedDate = (state, action) => {
  const userSelected = action.payload;

  const userSelectedDate = userSelected.getDate();

  const userSelectedDateEvents = state.eventList.filter((event) => {
    if (event.recurrence) {
      const createAtDate = new Date(event.created).getDate();
      const recurrenceStatusList = event.recurrence[0]
        .split(";")
        .reduce((obj, item) => {
          const splitedItem = item.split("=");
          return { ...obj, [splitedItem[0]]: splitedItem[1] };
        }, {});

      if (recurrenceStatusList["RRULE:FREQ"] === "DAILY") {
        if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
          return getDailyIntervalEvents(
            recurrenceStatusList,
            event,
            userSelectedDate,
            createAtDate
          );
        } else {
          return filterEvents(
            recurrenceStatusList,
            event,
            userSelectedDate,
            createAtDate
          );
        }
      }

      // if (
      //   recurrenceStatusList.hasOwnProperty("WEEKLY") &&
      //   recurrenceStatusList.hasOwnProperty("BYDAY")
      // ) {
      //   const Weekdays = recurrenceStatusList.split("BYDAY=")[1];
      //   if (Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])) {
      //     return event;
      //   }
      // }
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
