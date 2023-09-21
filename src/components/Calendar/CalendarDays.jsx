import { connect } from "react-redux";
import DayRow from "./Day/DayRow";
import { useEffect, useState } from "react";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";
import dayjs from "dayjs";
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";

const CalendarDays = ({ currentFullDate, dispatch }) => {
  const [select, setSelect] = useState({
    date: currentFullDate.date,
    month: currentFullDate.month,
    year: currentFullDate.year,
  });

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

      fetchEventsAPI(nextYear, nextMonth, dateValue.date);
      fetchHolidayAPI(nextYear, nextMonth);
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

      fetchEventsAPI(prevYear, prevMonth, dateValue.date);
      fetchHolidayAPI(prevYear, prevMonth);
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
