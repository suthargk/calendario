import dayjs from "dayjs";
import { filterMonthlyEvents } from "./filterEvents/filterMonthlyEvents";
import { filterDailyAndWeeklyEvents } from "./filterEvents/filterDailyAndWeeklyEvents";

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
  return Math.ceil(
    (startOfWeek(new Date(d2)) - startOfWeek(new Date(d1))) / week
  );
}

export function getMonthDifference(d1, d2) {
  const monthDiff = d2.getMonth() - d1.getMonth();
  const yearDiff = d2.getYear() - d1.getYear();
  return monthDiff + yearDiff * 12;
}

export function getWeeklyOccurences({
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

export function getNthWeekdayDate(firstDayOfMonth, weekday, nth) {
  const firstWeekday = firstDayOfMonth.add(
    (weekday - firstDayOfMonth.day() + 7) % 7,
    "day"
  );
  const nthOccurrence = firstWeekday.add((nth - 1) * 7, "day");
  return nthOccurrence;
}

export function getLastWeekdayMonth(year, month, weekday) {
  "use strict";
  let lastDay = new Date(year, month + 1, 0);
  if (lastDay.getDay() < weekday) {
    lastDay.setDate(lastDay.getDate() - 7);
  }
  lastDay.setDate(lastDay.getDate() - (lastDay.getDay() - weekday));
  return lastDay;
}

export const getIsDateOnEveryMonth = ({ event, userSelected }) => {
  const dayDifferenceFromStartOfMonth =
    dayjs(userSelected).diff(
      new Date(userSelected.getFullYear(), userSelected.getMonth(), 1),
      "days"
    ) + 1;

  return (
    dayDifferenceFromStartOfMonth === new Date(event.start.dateTime).getDate()
  );
};

export const getDailyRruleEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
}) => {
  const dailyIntervalRepeatDays = Number(recurrenceStatusList["INTERVAL"]);

  if (dateDifference >= 0 && dateDifference % dailyIntervalRepeatDays === 0) {
    return filterDailyAndWeeklyEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      interval: Number(recurrenceStatusList["INTERVAL"]),
    });
  }
};

export const getWeeklyRruleEvents = ({
  recurrenceStatusList,
  event,
  eventStartAt,
  userSelected,
  dayDifference,
  dateDifference,
}) => {
  const weeklyIntervalRepeatWeeks = Number(recurrenceStatusList["INTERVAL"]);
  const Weekdays = recurrenceStatusList["BYDAY"];
  if (
    dateDifference % weeklyIntervalRepeatWeeks === 0 &&
    dayDifference >= 0 &&
    Weekdays.includes(WEEKDAYVALUES[userSelected.getDay()])
  ) {
    return filterDailyAndWeeklyEvents({
      recurrenceStatusList,
      event,
      userSelected,
      dateDifference,
      eventStartAt,
      interval: weeklyIntervalRepeatWeeks,
    });
  }
};

export const getMonthlyRruleEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
  dateDifference,
}) => {
  const montlyIntervalRepeatMonths = Number(recurrenceStatusList["INTERVAL"]);

  if (
    dateDifference % montlyIntervalRepeatMonths === 0 &&
    dateDifference >= 0
  ) {
    return filterMonthlyEvents({
      recurrenceStatusList,
      event,
      userSelected,
    });
  }
};

export const getYearlyRruleEvents = ({
  dateDifference,
  event,
  recurrenceStatusList,
  userSelected,
}) => {
  const yearlyIntervalRepeatMonths = Number(recurrenceStatusList["INTERVAL"]);

  if (
    dateDifference % yearlyIntervalRepeatMonths === 0 &&
    dateDifference >= 0
  ) {
    if (
      dayjs(event.start.dateTime.split("T")[0])
        .add(dateDifference, "year")
        .diff(userSelected, "days") === 0
    )
      return event;
  }
};
