import { connect } from "react-redux";
import DayRow from "../Day/DayRow";
import { useState } from "react";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";

const CalendarDays = ({ currentDate, dispatch }) => {
  const [select, setSelect] = useState({ date: null, month: null, year: null });

  const handleDaySelect = (dateValue) => {
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
    });

    if (dateValue.nextMonthDate) {
      dispatch({
        type: NEXT_MONTH,
        payload: {
          date: dateValue.date,
          month: currentMonth,
          year: currentYear,
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
        },
      });
    }

    const selectedDate = new Date(
      `${currentDate.year}-${String(currentDate.month + 1).padStart(
        2,
        0
      )}-${String(dateValue.date).padStart(2, 0)}`
    );

    dispatch({
      type: USER_SELECTED_DATE,
      payload: selectedDate,
    });

    // const minTimeUTC = selectedDate.startOf("day").utc().format();
    // const maxTimeUTC = selectedDate.endOf("day").utc().format();
    // fetchEvents({ timeMin: minTimeUTC, timeMax: maxTimeUTC });
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
            year={currentDate.year}
            month={currentDate.month}
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
    date: state.calendar.currentDate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarDays);
