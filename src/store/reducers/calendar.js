import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
  SELECTED_DATE,
} from "../actions";

dayjs.extend(utc);

let currentDateObj = dayjs();

const INITIAL_STATE = {
  firstDayOfMonth: Number(currentDateObj.startOf("month").format("d")),
  date: currentDateObj.date(),
  month: currentDateObj.month(),
  daysInMonth: currentDateObj.daysInMonth(),
  year: currentDateObj.year(),
};

const applyPrevMonth = (state, action) => {
  const { prevMonth: month } = action.payload;
  currentDateObj = currentDateObj.subtract(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    month: month < 0 ? 11 : month,
    year: month < 0 ? state.year - 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
  };
};

const applyNextMonth = (state, action) => {
  const { nextMonth: month } = action.payload;
  currentDateObj = currentDateObj.add(1, "month");
  const firstDayOfMonth = currentDateObj.startOf("month").format("d");

  return {
    ...state,
    month: month > 11 ? 0 : month,
    year: month > 11 ? state.year + 1 : state.year,
    firstDayOfMonth: Number(firstDayOfMonth),
    daysInMonth: currentDateObj.daysInMonth(),
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
      return INITIAL_STATE;
    }
    case SELECTED_DATE: {
      // return applySelectedDate(state, action)
      return INITIAL_STATE;
    }
    default:
      return state;
  }
};

export default calendarReducer;
