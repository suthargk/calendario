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

export function weeksBetween(d1, d2) {
  return Math.ceil((startOfWeek(d2) - startOfWeek(d1)) / week);
}

export function getMonthDifference(d1, d2) {
  const monthDiff = d2.getMonth() - d1.getMonth();
  const yearDiff = d2.getYear() - d1.getYear();
  return monthDiff + yearDiff * 12;
}

function getWeeklyOccurences({
  startDate,
  count,
  interval,
  recurrenceStatusList,
}) {
  const occurrences = [];
  let currentDate = new Date(startDate);

  while (occurrences.length < count) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

    if (recurrenceStatusList["BYDAY"].includes(WEEKDAYVALUES[dayOfWeek])) {
      occurrences.push(new Date(currentDate));
    }

    currentDate.setDate(currentDate.getDate() + interval);
  }

  return occurrences;
}

function getNthWeekdayDate(year, month, getWeekDayInNumber, dateUnit) {
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfWeek = getWeekDayInNumber; // 5 corresponds to Friday

  // Calculate the date of the first occurrence of the specified day
  const firstOccurrence = new Date(
    year,
    month,
    1 + ((dayOfWeek - firstDayOfMonth.getDay() + 7) % 7)
  );

  // Calculate the date of the nth occurrence
  const nthOccurrence = new Date(firstOccurrence);
  nthOccurrence.setDate(firstOccurrence.getDate() + (dateUnit - 1) * 7);

  return nthOccurrence;
}

export const filterEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
  eventStartAt,
  interval = 1,
}) => {
  if (
    !recurrenceStatusList.hasOwnProperty("UNTIL") &&
    !recurrenceStatusList.hasOwnProperty("COUNT") &&
    dateDifference >= 0
  ) {
    return event;
  }

  if (recurrenceStatusList.hasOwnProperty("COUNT")) {
    if (recurrenceStatusList.hasOwnProperty("BYDAY")) {
      const occurrences = getWeeklyOccurences({
        startDate: eventStartAt,
        count: Number(recurrenceStatusList["COUNT"]),
        interval,
        recurrenceStatusList,
      });

      const endDate = occurrences[occurrences.length - 1];
      return userSelected <= endDate && endDate;
    }

    if (
      dateDifference >= 0 &&
      dateDifference < recurrenceStatusList["COUNT"] * interval
    )
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

const filterMonthlyEvents = ({
  recurrenceStatusList,
  event,
  eventStartAt,
  userSelected,
  dateDifference,
}) => {
  if (
    recurrenceStatusList.hasOwnProperty("BYDAY") &&
    !recurrenceStatusList.hasOwnProperty("UNTIL") &&
    !recurrenceStatusList.hasOwnProperty("COUNT")
  ) {
    const dateUnit = recurrenceStatusList["BYDAY"].replace(/[^-0-9]/g, "");
    const weekDayUnit = recurrenceStatusList["BYDAY"].replace(/[^A-Z]/g, "");
    const getWeekDayInNumber = Object.keys(WEEKDAYVALUES).find(
      (day) => WEEKDAYVALUES[day] === weekDayUnit
    );

    const nthWeekdayDate = getNthWeekdayDate(
      userSelected.getFullYear(),
      userSelected.getMonth(),
      getWeekDayInNumber,
      dateUnit
    );

    if (dayjs(userSelected).diff(nthWeekdayDate, "days") === 0) return event;
  }
};

export const getDailyIntervalEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
}) => {
  const dailyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  if (dateDifference >= 0 && dateDifference % dailyIntervalRepeatDays === 0) {
    return filterEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      interval: Number(recurrenceStatusList["INTERVAL"]),
    });
  }
};

export const getWeeklyIntervalEvents = ({
  recurrenceStatusList,
  event,
  eventStartAt,
  Weekdays,
  userSelected,
  dateDifference,
}) => {
  const weeklyIntervalRepeatWeeks = Number(recurrenceStatusList["INTERVAL"]);

  if (
    dateDifference % weeklyIntervalRepeatWeeks === 0 &&
    Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])
  ) {
    return filterEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      eventStartAt,
      interval: weeklyIntervalRepeatWeeks,
    });
  }
};

export const getMonthlyIntervalEvents = ({
  recurrenceStatusList,
  event,
  eventStartAt,
  userSelected,
  dateDifference,
}) => {
  const montlyIntervalRepeatMonths = Number(recurrenceStatusList["INTERVAL"]);
  if (dateDifference % montlyIntervalRepeatMonths === 0) {
    return filterMonthlyEvents({
      recurrenceStatusList,
      event,
      eventStartAt,
      userSelected,
      dateDifference,
    });
  }
};
