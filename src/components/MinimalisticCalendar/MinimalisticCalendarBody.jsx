import React from "react";
import { connect } from "react-redux";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import { WEEKDAYVALUES } from "../../store/reducers/utils";
import { getPrevNextFiveDates } from "./utils";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import dayjs from "dayjs";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";

const MinimalisticCalendarBody = ({
  currentDate,
  currentDay,
  currentMonth,
  currentYear,
  dispatch,
  daysInPreviousMonth,
  daysInMonth,
}) => {
  const prevNextFiveDates = getPrevNextFiveDates({
    currentDate,
    currentDay,
    daysInPreviousMonth,
    daysInMonth,
  });

  const handleUserSelectDate = (dateObj) => {
    let selectedDateMonth = currentMonth;
    let selectedDateYear = currentYear;

    if (dateObj.isNextMonthDate) {
      const { nextMonth, nextYear } = getNextMonthDate(
        selectedDateMonth + 1,
        selectedDateYear
      );

      selectedDateMonth = nextMonth;
      selectedDateYear = nextYear;

      dispatch({
        type: NEXT_MONTH,
        payload: {
          date: dateObj.date,
          month: selectedDateMonth,
          year: selectedDateYear,
          day: dateObj.day,
        },
      });

      fetchEventsAPI(nextYear, nextMonth);
      fetchHolidayAPI(nextYear, nextMonth);
    }

    if (dateObj.isPrevMonthDate) {
      const { prevMonth, prevYear } = getPrevMonthDate(
        selectedDateMonth - 1,
        selectedDateYear
      );

      selectedDateMonth = prevMonth;
      selectedDateYear = prevYear;

      dispatch({
        type: PREV_MONTH,
        payload: {
          date: dateObj.date,
          month: selectedDateMonth,
          year: selectedDateYear,
          day: dateObj.day,
        },
      });

      fetchEventsAPI(prevYear, prevMonth);
      fetchHolidayAPI(prevYear, prevMonth);
    }

    const selectedDate = dayjs(
      new Date(selectedDateYear, selectedDateMonth, dateObj.date)
    );

    dispatch({
      type: USER_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  return (
    <div className="flex justify-between items-center select-none">
      <button
        onClick={() => handleUserSelectDate(prevNextFiveDates[1])}
        className="p-1.5 rounded-full border border-gray-200 bg-white"
      >
        <PrevChevron width={11} height={11} />
      </button>

      <div className="flex justify-center">
        {prevNextFiveDates.map((dateObj) => {
          return (
            <div
              key={dateObj.date}
              style={{ width: "52px" }}
              className={`py-2 cursor-pointer  text-center rounded-lg text-sm ${
                currentDate === dateObj.date ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleUserSelectDate(dateObj)}
            >
              <div
                className={`${
                  currentDate === dateObj.date ? "text-white" : "text-gray-400"
                }`}
              >
                {WEEKDAYVALUES[dateObj.day]}
              </div>
              <div className="text-lg">
                {String(dateObj.date).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>

      <button
        className="p-1.5 rounded-full border border-gray-200 bg-white"
        onClick={() => handleUserSelectDate(prevNextFiveDates[3])}
      >
        <NextChevron width={11} height={11} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.calendar.date,
    currentYear: state.calendar.year,
    currentMonth: state.calendar.month,
    currentDay: state.calendar.day,
    daysInPreviousMonth: state.calendar.daysInPreviousMonth,
    daysInMonth: state.calendar.daysInMonth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinimalisticCalendarBody);
