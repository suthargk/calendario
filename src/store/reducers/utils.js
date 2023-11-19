import dayjs from "dayjs";
import { filterMonthlyEvents } from "./filterEvents/filterMonthlyEvents";
import { filterDailyAndWeeklyEvents } from "./filterEvents/filterDailyAndWeeklyEvents";

export const WEEKDAYVALUES = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
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
    Weekdays.includes(
      WEEKDAYVALUES[userSelected.day()].toUpperCase().slice(0, 2)
    )
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
  "emerald",
  "teal",
];

export const bgLinearGradientColor = {
  red: `from-red-200 to-red-100`,
  orange: `from-orange-200 to-orange-100`,
  blue: `from-blue-200 to-blue-100`,
  violet: `from-violet-200 to-violet-100`,
  indigo: `from-indigo-200 to-indigo-100`,
  amber: `from-amber-200 to-amber-100`,
  yellow: `from-yellow-200 to-yellow-100`,
  lime: `from-lime-200 to-lime-100`,
  green: `from-green-200 to-green-100`,
  cyan: `from-cyan-200 to-cyan-100`,
  sky: `from-sky-200 to-sky-100`,
  purple: `from-purple-200 to-purple-100`,
  fuchsia: `from-fuchsia-200 to-fuchsia-100`,
  pink: `from-pink-200 to-pink-100`,
  rose: `from-rose-200 to-rose-100`,
  emerald: `from-emerald-200 to-emerald-100`,
  teal: `from-teal-200 to-teal-100`,
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
  emerald: `text-emerald-900`,
  teal: `text-teal-900`,
};

export const textColor = {
  red: {
    light: `text-red-200`,
    dark: `text-red-600`,
    darkest: `text-red-800`,
    darkMode: `dark:text-orange-200`,
  },
  orange: {
    light: `text-orange-200`,
    dark: `text-orange-600`,
    darkest: `text-orange-800`,
    darkMode: `dark:text-orange-200`,
  },
  blue: {
    light: `text-blue-200`,
    dark: `text-blue-600`,
    darkest: `text-blue-800`,
    darkMode: `dark:text-blue-200`,
  },
  violet: {
    light: `text-violet-200`,
    dark: `text-violet-600`,
    darkest: `text-violet-800`,
    darkMode: `dark:text-violet-200`,
  },
  indigo: {
    light: `text-indigo-200`,
    dark: `text-indigo-600`,
    darkest: `text-indigo-800`,
    darkMode: `dark:text-indigo-200`,
  },
  amber: {
    light: `text-amber-200`,
    dark: `text-amber-600`,
    darkest: `text-amber-800`,
    darkMode: `dark:text-amber-200`,
  },
  yellow: {
    light: `text-yellow-200`,
    dark: `text-yellow-600`,
    darkest: `text-yellow-800`,
    darkMode: `dark:text-yellow-200`,
  },
  lime: {
    light: `text-lime-200`,
    dark: `text-lime-600`,
    darkest: `text-lime-800`,
    darkMode: `dark:text-lime-200`,
  },
  green: {
    light: `text-green-200`,
    dark: `text-green-600`,
    darkest: `text-green-800`,
    darkMode: `dark:text-green-200`,
  },
  cyan: {
    light: `text-cyan-200`,
    dark: `text-cyan-600`,
    darkest: `text-cyan-800`,
    darkMode: `dark:text-cyan-200`,
  },
  sky: {
    light: `text-sky-200`,
    dark: `text-sky-600`,
    darkest: `text-sky-800`,
    darkMode: `dark:text-sky-200`,
  },
  purple: {
    light: `text-purple-200`,
    dark: `text-purple-600`,
    darkest: `text-purple-800`,
    darkMode: `dark:text-purple-200`,
  },
  fuchsia: {
    light: `text-fuchsia-200`,
    dark: `text-fuchsia-600`,
    darkest: `text-fuchsia-800`,
    darkMode: `dark:text-fuchsia-200`,
  },
  pink: {
    light: `text-pink-200`,
    dark: `text-pink-600`,
    darkest: `text-pink-800`,
    darkMode: `dark:text-pink-200`,
  },
  rose: {
    light: `text-rose-200`,
    dark: `text-rose-600`,
    darkest: `text-rose-800`,
    darkMode: `dark:text-rose-200`,
  },
  emerald: {
    light: `text-emerald-200`,
    dark: `text-emerald-600`,
    darkest: `text-emerald-800`,
    darkMode: `dark:text-emerald-200`,
  },
  teal: {
    light: `text-teal-200`,
    dark: `text-teal-600`,
    darkest: `text-teal-800`,
    darkMode: `dark:text-teal-200`,
  },
};

export const bgColor = {
  red: { light: "bg-red-500", dark: `bg-red-600` },
  orange: { light: "bg-orange-500", dark: `bg-orange-600` },
  blue: { light: "bg-blue-500", dark: `bg-blue-600` },
  violet: { light: "bg-violet-500", dark: `bg-violet-600` },
  indigo: { light: "bg-indigo-500", dark: `bg-indigo-600` },
  amber: { light: "bg-amber-500", dark: `bg-amber-600` },
  yellow: { light: "bg-yellow-500", dark: `bg-yellow-600` },
  lime: { light: "bg-lime-500", dark: `bg-lime-600` },
  green: { light: "bg-green-500", dark: `bg-green-600` },
  cyan: { light: "bg-cyan-500", dark: `bg-cyan-600` },
  sky: { light: "bg-sky-500", dark: `bg-sky-600` },
  purple: { light: "bg-purple-500", dark: `bg-purple-600` },
  fuchsia: { light: "bg-fuchsia-500", dark: `bg-fuchsia-600` },
  pink: { light: "bg-pink-500", dark: `bg-pink-600` },
  rose: { light: "bg-rose-500", dark: `bg-rose-600` },
  emerald: { light: "bg-emerald-500", dark: `bg-emerald-600` },
  teal: { light: "bg-teal-500", dark: `bg-teal-600` },
};

export const attendeeBgColor = {
  red: { light: `bg-red-200`, darkMode: `dark:bg-red-500` },
  orange: { light: `bg-orange-200`, darkMode: `dark:bg-orange-500` },
  blue: { light: `bg-blue-200`, darkMode: `dark:bg-blue-500` },
  violet: { light: `bg-violet-200`, darkMode: `dark:bg-violet-500` },
  indigo: { light: `bg-indigo-200`, darkMode: `dark:bg-indigo-500` },
  amber: { light: `bg-amber-200`, darkMode: `dark:bg-amber-500` },
  yellow: { light: `bg-yellow-200`, darkMode: `dark:bg-yellow-500` },
  lime: { light: `bg-lime-200`, darkMode: `dark:bg-lime-500` },
  green: { light: `bg-green-200`, darkMode: `dark:bg-green-500` },
  cyan: { light: `bg-cyan-200`, darkMode: `dark:bg-cyan-500` },
  sky: { light: `bg-sky-200`, darkMode: `dark:bg-sky-500` },
  purple: { light: `bg-purple-200`, darkMode: `dark:bg-purple-500` },
  fuchsia: { light: `bg-fuchsia-200`, darkMode: `dark:bg-fuchsia-500` },
  pink: { light: `bg-pink-200`, darkMode: `dark:bg-pink-500` },
  rose: { light: `bg-rose-200`, darkMode: `dark:bg-rose-500` },
  emerald: { light: `bg-emerald-200`, darkMode: `dark:bg-emerald-500` },
  teal: { light: `bg-teal-200`, darkMode: `dark:bg-teal-500` },
};

export const borderColor = {
  red: { light: `border-red-200`, dark: `border-red-600` },
  orange: { light: `border-orange-200`, dark: `border-orange-600` },
  blue: { light: `border-blue-200`, dark: `border-blue-600` },
  violet: { light: `border-violet-200`, dark: `border-violet-600` },
  indigo: { light: `border-indigo-200`, dark: `border-indigo-600` },
  amber: { light: `border-amber-200`, dark: `border-amber-600` },
  yellow: { light: `border-yellow-200`, dark: `border-yellow-600` },
  lime: { light: `border-lime-200`, dark: `border-lime-600` },
  green: { light: `border-green-200`, dark: `border-green-600` },
  cyan: { light: `border-cyan-200`, dark: `border-cyan-600` },
  sky: { light: `border-sky-200`, dark: `border-sky-600` },
  purple: { light: `border-purple-200`, dark: `border-purple-600` },
  fuchsia: { light: `border-fuchsia-200`, dark: `border-fuchsia-600` },
  pink: { light: `border-pink-200`, dark: `border-pink-600` },
  rose: { light: `border-rose-200`, dark: `border-rose-600` },
  emerald: { light: `border-emerald-200`, dark: `border-emerald-600` },
  teal: { light: `border-teal-200`, dark: `border-teal-600` },
};

export const generateUserProfile = (user_name) => {
  const userName = user_name.split(" ");

  return userName.length === 1
    ? userName[0].slice(0, 2)
    : userName[0][0] + userName[1][0];
};

export const getColorOnEventCard = (events) => {
  return events.items.map((event) => {
    const colorName = colors[Math.trunc(Math.random() * colors.length)];

    const attendeesWithColor = event?.attendees?.length
      ? event.attendees.map((attendee) => {
          const colorName = colors[Math.trunc(Math.random() * colors.length)];
          return { ...attendee, color: colorName };
        })
      : [];

    return { ...event, attendees: attendeesWithColor, color: colorName };
  });
};
