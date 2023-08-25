import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
  USER_SELECTED_DATE,
} from "../actions";

dayjs.extend(utc);

let currentDateObj = dayjs();

const INITIAL_STATE = {
  firstDayOfMonth: Number(currentDateObj.startOf("month").format("d")),
  date: currentDateObj.date(),
  month: currentDateObj.month(),
  daysInMonth: currentDateObj.daysInMonth(),
  year: currentDateObj.year(),
  daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
};

const applyPrevMonth = (state, action) => {
  const { date, month, year } = action.payload;
  currentDateObj = currentDateObj.subtract(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
    date,
    month,
    year,
  };
};

const applyNextMonth = (state, action) => {
  const { date, month, year } = action.payload;
  currentDateObj = currentDateObj.add(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
    date,
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
      return { ...state, date: userSelectedDate.getDate() };
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
