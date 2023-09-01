import dayjs from "dayjs";
import {
  WEEKDAYVALUES,
  getIsDateOnEveryMonth,
  getLastWeekdayMonth,
  getNthWeekdayDate,
} from "../utils";

export const filterMonthlyEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
}) => {
  if (recurrenceStatusList.hasOwnProperty("BYDAY")) {
    let dateUnit = recurrenceStatusList["BYDAY"].replace(/[^-0-9]/g, "");
    const weekDay = recurrenceStatusList["BYDAY"].replace(/[^A-Z]/g, "");
    const firstDayOfMonth = dayjs(userSelected).startOf("month");
    const getWeekDayInNumber = Object.keys(WEEKDAYVALUES).find(
      (day) => WEEKDAYVALUES[day] === weekDay
    );

    const nthWeekdayDate =
      dateUnit === "-1"
        ? getLastWeekdayMonth(
            userSelected.getFullYear(),
            userSelected.getMonth(),
            getWeekDayInNumber
          )
        : getNthWeekdayDate(
            firstDayOfMonth,
            Number(getWeekDayInNumber),
            dateUnit
          );

    if (dayjs(userSelected).diff(nthWeekdayDate, "days") === 0) {
      return event;
    }
  } else {
    const isDateOnEveryMonth = getIsDateOnEveryMonth({ event, userSelected });
    if (isDateOnEveryMonth) return event;
  }
};
