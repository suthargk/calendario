import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { NEXT_MONTH, PREV_MONTH, RESET_CURRENT_TIME } from "../actions";

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
  const { prevMonth } = action.payload;
  currentDateObj = currentDateObj.subtract(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    month: prevMonth < 0 ? 11 : prevMonth,
    year: prevMonth < 0 ? state.year - 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
  };
};

const applyNextMonth = (state, action) => {
  const { nextMonth } = action.payload;
  currentDateObj = currentDateObj.add(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    month: nextMonth > 11 ? 0 : nextMonth,
    year: nextMonth > 11 ? state.year + 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
    daysInPreviousMonth: currentDateObj.subtract(1, "month").daysInMonth(),
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
    case RESET_CURRENT_TIME: {
      currentDateObj = dayjs(); // RESET current time
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default calendarReducer;
