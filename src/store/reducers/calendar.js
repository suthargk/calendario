import dayjs from "dayjs";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
  USER_SELECTED_DATE,
} from "../actions";

let currentDateObj = dayjs();

const INITIAL_STATE = {
  firstDayOfMonth: Number(currentDateObj.startOf("month").format("d")),
  date: currentDateObj.date(),
  month: currentDateObj.month(),
  daysInMonth: currentDateObj.daysInMonth(),
  year: currentDateObj.year(),
  day: currentDateObj.day(),
  daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
};

const applyPrevMonth = (state, action) => {
  const { date, month, year } = action.payload;
  currentDateObj = currentDateObj.subtract(1, "month");
  const firstDayOfMonth = Number(currentDateObj.startOf("month").format("d"));

  const day =
    dayjs().format("YYYY-MM-DD") ===
    dayjs(new Date(year, month, date)).format("YYYY-MM-DD")
      ? dayjs().day()
      : firstDayOfMonth;

  return {
    ...state,
    firstDayOfMonth,
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
    date,
    day,
    month,
    year,
  };
};

const applyNextMonth = (state, action) => {
  const { date, month, year } = action.payload;
  currentDateObj = currentDateObj.add(1, "month");
  const firstDayOfMonth = Number(currentDateObj.startOf("month").format("d"));

  return {
    ...state,
    firstDayOfMonth,
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
    date,
    day: firstDayOfMonth,
    month,
    year,
  };
};

const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PREV_MONTH: {
      return applyPrevMonth(state, action);
    }

    case NEXT_MONTH: {
      return applyNextMonth(state, action);
    }

    case USER_SELECTED_DATE: {
      const userSelectedDate = action.payload;

      return {
        ...state,
        day: userSelectedDate.day(),
        date: userSelectedDate.date(),
      };
    }

    case RESET_CURRENT_TIME: {
      currentDateObj = dayjs(); // RESET current time
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default calendarReducer;
