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

const CalendarDays = ({ currentDate, dispatch }) => {
  const [select, setSelect] = useState({
    date: currentDate.date,
    month: currentDate.month,
    year: currentDate.year,
  });

  useEffect(() => {
    setSelect({
      ...select,
      date: currentDate.date,
      month: currentDate.month,
      year: currentDate.year,
    });
  }, [currentDate.date]);

  const handleDaySelect = (dateValue, day) => {
    let currentMonth = currentDate.month;
    let currentYear = currentDate.year;

    if (dateValue.nextMonthDate) {
      const { nextMonth, nextYear } = getNextMonthDate(
        currentMonth + 1,
        currentYear
      );

      currentMonth = nextMonth;
      currentYear = nextYear;
    }

    if (dateValue.prevMonthDate) {
      const { prevMonth, prevYear } = getPrevMonthDate(
        currentMonth - 1,
        currentYear
      );

      currentMonth = prevMonth;
      currentYear = prevYear;
    }

    setSelect({
      date: dateValue.date,
      month: currentMonth,
      year: currentYear,
      day,
    });

    if (dateValue.nextMonthDate) {
      dispatch({
        type: NEXT_MONTH,
        payload: {
          date: dateValue.date,
          month: currentMonth,
          year: currentYear,
          day,
        },
      });
    }

    if (dateValue.prevMonthDate) {
      dispatch({
        type: PREV_MONTH,
        payload: {
          date: dateValue.date,
          month: currentMonth,
          year: currentYear,
          day,
        },
      });
    }

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
            firstDayOfMonth={currentDate.firstDayOfMonth}
            daysInMonth={currentDate.daysInMonth}
            currentYear={currentDate.year}
            currentMonth={currentDate.month}
            daysInPreviousMonth={currentDate.daysInPreviousMonth}
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
    currentDate: state.calendar,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDays);
