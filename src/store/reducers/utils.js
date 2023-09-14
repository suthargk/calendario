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

export const colors = [
  "red",
  "orange",
  "blue",
  "violet",
  "indigo",
  "amber",
  "yellow",
  "lime",
  "green",
  "cyan",
  "sky",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];

export const bgLinearGradientColor = {
  red: `from-red-100 to-red-50`,
  orange: `from-orange-100 to-orange-50`,
  blue: `from-blue-100 to-blue-50`,
  violet: `from-violet-100 to-violet-50`,
  indigo: `from-indigo-100 to-indigo-50`,
  amber: `from-amber-100 to-amber-50`,
  yellow: `from-yellow-100 to-yellow-50`,
  lime: `from-lime-100 to-lime-50`,
  green: `from-green-100 to-green-50`,
  cyan: `from-cyan-100 to-cyan-50`,
  sky: `from-sky-100 to-sky-50`,
  purple: `from-purple-100 to-purple-50`,
  fuchsia: `from-fuchsia-100 to-fuchsia-50`,
  pink: `from-pink-100 to-pink-50`,
  rose: `from-rose-100 to-rose-50`,
};

export const HeadingTextColor = {
  red: `text-red-900`,
  orange: `text-orange-900`,
  blue: `text-blue-900`,
  violet: `text-violet-900`,
  indigo: `text-indigo-900`,
  amber: `text-amber-900`,
  yellow: `text-yellow-900`,
  lime: `text-lime-900`,
  green: `text-green-900`,
  cyan: `text-cyan-900`,
  sky: `text-sky-900`,
  purple: `text-purple-900`,
  fuchsia: `text-fuchsia-900`,
  pink: `text-pink-900`,
  rose: `text-rose-900`,
};

export const textColor = {
  red: `text-red-800`,
  orange: `text-orange-800`,
  blue: `text-blue-800`,
  violet: `text-violet-800`,
  indigo: `text-indigo-800`,
  amber: `text-amber-800`,
  yellow: `text-yellow-800`,
  lime: `text-lime-800`,
  green: `text-green-800`,
  cyan: `text-cyan-800`,
  sky: `text-sky-800`,
  purple: `text-purple-800`,
  fuchsia: `text-fuchsia-800`,
  pink: `text-pink-800`,
  rose: `text-rose-800`,
};

export const bgColor = {
  red: `bg-red-600`,
  orange: `bg-orange-600`,
  blue: `bg-blue-600`,
  violet: `bg-violet-600`,
  indigo: `bg-indigo-600`,
  amber: `bg-amber-600`,
  yellow: `bg-yellow-600`,
  lime: `bg-lime-600`,
  green: `bg-green-600`,
  cyan: `bg-cyan-600`,
  sky: `bg-sky-600`,
  purple: `bg-purple-600`,
  fuchsia: `bg-fuchsia-600`,
  pink: `bg-pink-600`,
  rose: `bg-rose-600`,
};

export const attendeeBgColor = {
  red: `bg-red-200`,
  orange: `bg-orange-200`,
  blue: `bg-blue-200`,
  violet: `bg-violet-200`,
  indigo: `bg-indigo-200`,
  amber: `bg-amber-200`,
  yellow: `bg-yellow-200`,
  lime: `bg-lime-200`,
  green: `bg-green-200`,
  cyan: `bg-cyan-200`,
  sky: `bg-sky-200`,
  purple: `bg-purple-200`,
  fuchsia: `bg-fuchsia-200`,
  pink: `bg-pink-200`,
  rose: `bg-rose-200`,
};

export const generateUserProfile = (user_name) => {
  const userName = user_name.split(" ");

  return userName.length === 1
    ? userName[0].slice(0, 2)
    : userName[0][0] + userName[1][0];
};
