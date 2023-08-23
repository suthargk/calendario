import dayjs from "dayjs";

export const WEEKDAYVALUES = {
  0: "SU",
  1: "MO",
  2: "TU",
  3: "WE",
  4: "TH",
  5: "FR",
  6: "SA",
};

const week = 7 * 24 * 60 * 60 * 1000;
const day = 24 * 60 * 60 * 1000;

function startOfWeek(dt) {
  const weekday = dt.getDay();
  return new Date(dt.getTime() - Math.abs(0 - weekday) * day);
}

function weeksBetween(d1, d2) {
  return Math.ceil((startOfWeek(d2) - startOfWeek(d1)) / week);
}

export const filterEvents = (
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

export const getDailyIntervalEvents = (
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference
) => {
  const dailyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  if (dateDifference > 0 && dateDifference % dailyIntervalRepeatDays === 0) {
    return filterEvents(
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      Number(recurrenceStatusList["INTERVAL"])
    );
  }
};

export const getWeeklyIntervalEvents = (
  recurrenceStatusList,
  event,
  eventStartAt,
  Weekdays,
  userSelected
) => {
  const weeklyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);
  const resetEventStartAtTime = new Date(dayjs(eventStartAt).startOf("day"));

  const weekDifference = weeksBetween(resetEventStartAtTime, userSelected) - 1;

  if (
    weekDifference % weeklyIntervalRepeatDays === 0 &&
    Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])
  ) {
    return filterEvents(
      recurrenceStatusList,
      event,
      userSelected,
      weekDifference
    );
  }
};
