import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import { NEXT_MONTH, PREV_MONTH, RESET_CURRENT_TIME } from "../actions";

dayjs.extend(utc);

let currentDateObj = dayjs();
let newCurrentDateObj = dayjs();

const INITIAL_STATE = {
  firstDayOfMonth: Number(newCurrentDateObj.startOf("month").format("d")),
  date: newCurrentDateObj.date(),
  month: newCurrentDateObj.month(),
  daysInMonth: newCurrentDateObj.daysInMonth(),
  year: newCurrentDateObj.year(),
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
      console.log("RESET", state, INITIAL_STATE);
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default calendarReducer;
