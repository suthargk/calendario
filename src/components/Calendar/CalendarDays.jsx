import { useEffect, useRef, useState } from "react";

import dayjs from "dayjs";
import { connect } from "react-redux";

import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";
import DayRow from "./Day/DayRow";

const CalendarDays = ({
  currentFullDate,
  dispatch,
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
}) => {
  const [select, setSelect] = useState({
    date: currentFullDate.date,
    month: currentFullDate.month,
    year: currentFullDate.year,
  });

  const fetchNextMonthRef = useRef(null);
  const fetchPrevMonthRef = useRef(null);

  useEffect(() => {
    setSelect({
      ...select,
      date: currentFullDate.date,
      month: currentFullDate.month,
      year: currentFullDate.year,
    });
  }, [currentFullDate.month, currentFullDate.date]);

  const handleDaySelect = (dateValue, day) => {
    let currentMonth = currentFullDate.month;
    let currentYear = currentFullDate.year;

    if (dateValue.isNextMonthDate) {
      const { nextMonth, nextYear } = getNextMonthDate(
        currentMonth + 1,
        currentYear
      );

      currentMonth = nextMonth;
      currentYear = nextYear;

      dispatch({
        type: NEXT_MONTH,
        payload: {
          date: dateValue.date,
          month: currentMonth,
          year: currentYear,
          day,
        },
      });

      if (fetchNextMonthRef.current) {
        clearTimeout(fetchNextMonthRef.current);
      }

      fetchNextMonthRef.current = setTimeout(() => {
        fetchEventsAPI(nextYear, nextMonth, setIsEventSectionLoading);
        fetchHolidayAPI(nextYear, nextMonth, setIsHolidaySectionLoading);
      }, 200);
    }

    if (dateValue.isPrevMonthDate) {
      const { prevMonth, prevYear } = getPrevMonthDate(
        currentMonth - 1,
        currentYear
      );

      currentMonth = prevMonth;
      currentYear = prevYear;

      dispatch({
        type: PREV_MONTH,
        payload: {
          date: dateValue.date,
          month: currentMonth,
          year: currentYear,
          day,
        },
      });

      if (fetchPrevMonthRef.current) {
        clearTimeout(fetchPrevMonthRef.current);
      }

      fetchPrevMonthRef.current = setTimeout(() => {
        fetchEventsAPI(prevYear, prevMonth, setIsEventSectionLoading);
        fetchHolidayAPI(prevYear, prevMonth, setIsHolidaySectionLoading);
      }, 200);
    }

    setSelect({
      date: dateValue.date,
      month: currentMonth,
      year: currentYear,
      day,
    });

    const selectedDate = dayjs(
      new Date(currentYear, currentMonth, dateValue.date)
    );

    dispatch({
      type: USER_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  return (
    <>
      {new Array(6).fill(null).map((_, index) => {
        return (
          <DayRow
            key={index}
            rowIndex={index}
            firstDayOfMonth={currentFullDate.firstDayOfMonth}
            daysInMonth={currentFullDate.daysInMonth}
            currentYear={currentFullDate.year}
            currentMonth={currentFullDate.month}
            daysInPreviousMonth={currentFullDate.daysInPreviousMonth}
            handleDaySelect={handleDaySelect}
            select={select}
          />
        );
      })}
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const mapStateToProps = (state) => {
  return {
    currentFullDate: state.calendar,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDays);
