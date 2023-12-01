import React, { useContext, useEffect, useState } from "react";

import dayjs from "dayjs";
import { connect } from "react-redux";

import { AccentColorContext } from "../../App";
import NextChevron from "../../assets/icons/NextChevron";
import PrevChevron from "../../assets/icons/PrevChevron";
import { bgColor } from "../../color";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import { WEEKDAYVALUES } from "../../store/reducers/utils";
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";
import ToolTip from "../common/ToolTip";
import { getPrevNextFiveDates } from "./utils";

const MinimalisticCalendarBody = ({
  currentDate,
  currentDay,
  currentMonth,
  currentYear,
  dispatch,
  daysInPreviousMonth,
  daysInMonth,
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
}) => {
  const [onPrevDateMouseOver, setOnPrevDateMouseOver] = useState(false);
  const [onNextDateMouseOver, setOnNextDateMouseOver] = useState(false);
  const { accentColor } = useContext(AccentColorContext);

  const prevNextFiveDates = getPrevNextFiveDates({
    currentDate,
    currentDay,
    daysInPreviousMonth,
    daysInMonth,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnPrevDateMouseOver(false);
      setOnNextDateMouseOver(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onPrevDateMouseOver, onNextDateMouseOver]);

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
      fetchEventsAPI(nextYear, nextMonth, setIsEventSectionLoading);
      fetchHolidayAPI(nextYear, nextMonth, setIsHolidaySectionLoading);
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

      fetchEventsAPI(prevYear, prevMonth, setIsEventSectionLoading);
      fetchHolidayAPI(prevYear, prevMonth, setIsHolidaySectionLoading);
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
    <div className="flex justify-between select-none relative">
      <div
        style={{ height: "inherit" }}
        className=" flex items-center bg-white dark:bg-slate-900 w-[32px]"
      >
        <button
          onClick={() => handleUserSelectDate(prevNextFiveDates[2])}
          className="relative p-1.5 rounded-full border border-gray-200 dark:border-slate-600 dark:bg-slate-700 bg-white focus:outline-2 focus:outline-blue-500"
          onMouseEnter={() => setOnPrevDateMouseOver(true)}
          onMouseLeave={() => setOnPrevDateMouseOver(false)}
          onFocus={() => setOnPrevDateMouseOver(true)}
          onBlur={() => setOnPrevDateMouseOver(false)}
        >
          <PrevChevron width={11} height={11} />
          {onPrevDateMouseOver && (
            <ToolTip direction="left" text="Previous date" />
          )}
        </button>
      </div>
      <div className="overflow-hidden">
        <div className="flex-1 flex justify-center">
          {prevNextFiveDates.map((dateObj) => {
            return (
              <div
                key={dateObj.date}
                style={{ minWidth: "52px", height: "60px" }}
                className={`py-2.5 flex flex-col justify-between items-center cursor-pointer text-center rounded-lg text-sm ${
                  currentDate === dateObj.date
                    ? `${bgColor[accentColor].light}  ${bgColor[accentColor].darkMode} text-white`
                    : ""
                }`}
                onClick={() => handleUserSelectDate(dateObj)}
              >
                <div
                  className={`${
                    currentDate === dateObj.date
                      ? "text-white"
                      : "text-gray-400 dark:text-slate-400"
                  } leading-none`}
                >
                  {WEEKDAYVALUES[dateObj.day]}
                </div>
                <div className="text-lg leading-none">
                  {String(dateObj.date).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{ height: "inherit" }}
        className="flex items-center bg-white w-[32px] justify-end dark:bg-slate-900"
      >
        <button
          className="relative p-1.5 rounded-full border border-gray-200 dark:bg-slate-700 dark:border-slate-600 bg-white focus:outline-2 focus:outline-blue-500"
          onClick={() => {
            handleUserSelectDate(prevNextFiveDates[4]);
          }}
          onMouseEnter={() => setOnNextDateMouseOver(true)}
          onMouseLeave={() => setOnNextDateMouseOver(false)}
          onFocus={() => setOnNextDateMouseOver(true)}
          onBlur={() => setOnNextDateMouseOver(false)}
        >
          <NextChevron width={11} height={11} />
          {onNextDateMouseOver && (
            <ToolTip direction="right" text="Next date" />
          )}
        </button>
      </div>
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
