import dayjs from "dayjs";
import {
  WEEKDAYVALUES,
  getIsDateOnEveryMonth,
  getNthWeekdayDate,
  weeksBetween,
} from "../utils";

export const filterMonthlyEvents = ({
  recurrenceStatusList,
  event,
  userSelected,
}) => {
  if (recurrenceStatusList.hasOwnProperty("BYDAY")) {
    let dateUnit = recurrenceStatusList["BYDAY"].replace(/[^-0-9]/g, "");
    const weekDay = recurrenceStatusList["BYDAY"].replace(/[^A-Z]/g, "");

    if (dateUnit === "-1") {
      const firstDayOfMonth = dayjs(
        `${userSelected.getFullYear()}-
          ${userSelected.getMonth() + 1}-01`
      );

      const weekDifference = weeksBetween(
        firstDayOfMonth,
        firstDayOfMonth.endOf("month")
      );
      dateUnit = weekDifference;
    }

    const getWeekDayInNumber = Object.keys(WEEKDAYVALUES).find(
      (day) => WEEKDAYVALUES[day] === weekDay
    );

    const nthWeekdayDate = getNthWeekdayDate(
      userSelected.getFullYear(),
      userSelected.getMonth(),
      getWeekDayInNumber,
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
