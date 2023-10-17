import dayjs from "dayjs";
import {
  getDailyRruleEvents,
  getMonthDifference,
  getMonthlyRruleEvents,
  getWeeklyRruleEvents,
  getYearlyRruleEvents,
  weeksBetween,
} from "../store/reducers/utils";

import CheckedIcon from "../assets/icons/CheckedIcon";
import CloseIcon from "../assets/icons/CloseIcon";
import QuestionMark from "../assets/icons/QuestionMark";

export const getRowDates = (
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  daysInPreviousMonth
) => {
  let arr = new Array(7).fill(0);
  const dayColumns = 7;

  if (rowIndex === 0) {
    arr = arr.map((_, i) =>
      i < firstDayOfMonth
        ? {
            date: daysInPreviousMonth + 1 + i - firstDayOfMonth,
            isPrevMonthDate: true,
            isNextMonthDate: false,
            isCurrentMonthDate: false,
          }
        : {
            date: i + 1 - firstDayOfMonth,
            isPrevMonthDate: false,
            isNextMonthDate: false,
            isCurrentMonthDate: true,
          }
    );
  } else {
    const rowDayStartsWith =
      dayColumns - firstDayOfMonth + 1 + dayColumns * (rowIndex - 1);

    arr = arr.map((_, i) => {
      if (i + rowDayStartsWith > daysInMonth)
        return {
          date: i + rowDayStartsWith - daysInMonth,
          isNextMonthDate: true,
          isPrevMonthDate: false,
          isCurrentMonthDate: false,
        };
      return {
        date: i + rowDayStartsWith,
        isNextMonthDate: false,
        isPrevMonthDate: false,
        isCurrentMonthDate: true,
      };
    });
  }

  return arr;
};

export const getNextMonthDate = (nextMonth, year) => {
  return {
    nextMonth: nextMonth > 11 ? 0 : nextMonth,
    nextYear: nextMonth > 11 ? year + 1 : year,
  };
};

export const getPrevMonthDate = (prevMonth, year) => {
  return {
    prevMonth: prevMonth < 0 ? 11 : prevMonth,
    prevYear: prevMonth < 0 ? year - 1 : year,
  };
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

export const getSelectedDateEvents = (eventList, userSelectedDate) => {
  const { date, month, year } = userSelectedDate;

  const userSelected = dayjs(new Date(year, month, date));

  const userSelectedDateEvents = eventList.filter((event) => {
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

  return userSelectedDateEvents;
};

export const getAttendeeStatus = (status) => {
  switch (status) {
    case "accepted": {
      return (
        <CheckedIcon
          width={7}
          height={7}
          className="bg-green-500 rounded-full text-white p-[1px] ring-1	ring-white	"
        />
      );
    }

    case "declined": {
      return (
        <CloseIcon
          width={7}
          height={7}
          className="bg-red-500 rounded-full text-white p-[1px] ring-1	ring-white	"
        />
      );
    }

    case "tentative": {
      return (
        <QuestionMark
          width={6}
          height={6}
          className="bg-orange-500 rounded-full text-white p-[1px] ring-1	ring-white	"
        />
      );
    }

    default:
      return null;
  }
};
