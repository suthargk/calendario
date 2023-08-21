import dayjs from "dayjs";
import { ADD_EVENTS, USER_SELECTED_DATE } from "../actions";
const INITIAL_EVENTS = {
  eventList: [],
  selectedDateEventList: [],
};

const WEEKDAYVALUES = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
};

const filterEvents = (
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
  interval = 1
) => {
  if (
    !recurrenceStatusList.hasOwnProperty("UNTIL") &&
    !recurrenceStatusList.hasOwnProperty("COUNT") &&
    dateDifference >= 0
  ) {
    return event;
  }

  if (
    recurrenceStatusList.hasOwnProperty("COUNT") &&
    dateDifference >= 0 &&
    dateDifference < recurrenceStatusList["COUNT"] * interval
  ) {
    return event;
  }

  if (
    recurrenceStatusList.hasOwnProperty("UNTIL") &&
    dateDifference >= 0 &&
    userSelected.getTime() <=
      new Date(
        recurrenceStatusList["UNTIL"]
          .split("T")[0]
          .replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3")
      ).getTime()
  ) {
    return event;
  }
};

const getWeeklyIntervalEvents = (
  recurrenceStatusList,
  event,
  createAtEvent,
  Weekdays,
  userSelected
) => {
  const weeklyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  console.log(dayjs(userSelected).diff(createAtEvent, "week"));
  // if (
  //   Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()]) &&
  //   userSelectedDate - createAtDate
  // ) {
  //   console.log("Event", event);
  // }
};

const getDailyIntervalEvents = (
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference
) => {
  const dailyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  if (dateDifference >= 0 && dateDifference % dailyIntervalRepeatDays === 0) {
    return filterEvents(
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      Number(recurrenceStatusList["INTERVAL"])
    );
  }
};

const applySelectedDate = (state, action) => {
  const userSelected = action.payload;

  // const userSelectedDate = userSelected.getDate();

  const userSelectedDateEvents = state.eventList.filter((event) => {
    const createAtEvent = new Date(event.created);
    if (event.recurrence) {
      const recurrenceStatusList = event.recurrence[0]
        .split(";")
        .reduce((obj, item) => {
          const splitedItem = item.split("=");
          return { ...obj, [splitedItem[0]]: splitedItem[1] };
        }, {});

      const userSelectedDate =
        new Date(userSelected).getTime() - new Date(createAtEvent).getTime();
      const dateDifference = Math.ceil(userSelectedDate / (1000 * 3600 * 24));

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
        console.log(event);
        const Weekdays = recurrenceStatusList["BYDAY"];
        if (recurrenceStatusList.hasOwnProperty("INTERVAL")) {
          return getWeeklyIntervalEvents(
            recurrenceStatusList,
            event,
            createAtEvent,
            Weekdays,
            userSelected
          );
        }

        //   if (Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])) {
        //     return event;
        //   }
        // }
      }

      // if (
      //   new Date(event.start.dateTime).toLocaleDateString() ===
      //   new Date(userSelected).toLocaleDateString()
      // )
      //   return event;
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
