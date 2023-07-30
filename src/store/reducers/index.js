import dayjs from "dayjs";
import { NEXT_MONTH, PREV_MONTH, RESET_CURRENT_TIME } from "./actions";

let dateObj = dayjs();

const INITIAL_STATE = {
  firstDayOfMonth: Number(dateObj.startOf("month").format("d")),
  month: dateObj.month(),
  daysInMonth: dateObj.daysInMonth(),
  year: dateObj.year(),
};

const applyPrevMonth = (state, action) => {
  const { prevMonth: month } = action.payload;
  dateObj = dateObj.subtract(1, "month");
  const firstDayOfMonth = dateObj.startOf("month").format("d");

  return {
    ...state,
    month: month < 0 ? 11 : month,
    year: month < 0 ? state.year - 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: dateObj.daysInMonth(),
  };
};

const applyNextMonth = (state, action) => {
  const { nextMonth: month } = action.payload;
  dateObj = dateObj.add(1, "month");
  const firstDayOfMonth = dateObj.startOf("month").format("d");

  return {
    ...state,
    month: month > 11 ? 0 : month,
    year: month > 11 ? state.year + 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: dateObj.daysInMonth(),
  };
};

const currentDateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PREV_MONTH: {
      return applyPrevMonth(state, action);
    }
    case NEXT_MONTH: {
      return applyNextMonth(state, action);
    }
    case RESET_CURRENT_TIME: {
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default currentDateReducer;
