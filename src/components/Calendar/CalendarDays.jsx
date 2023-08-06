import { connect } from "react-redux";
import DayRow from "../Day/DayRow";
import { useState } from "react";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import dayjs from "dayjs";

const CalendarDays = ({ currentDate, date, dispatch }) => {
  const [select, setSelect] = useState({ day: null, month: null, year: null });

  const handleDaySelect = (dateValue) => {
    console.log(dateValue);
    let newMonth = currentDate.month;
    let newYear = currentDate.year;

    if (dateValue.nextMonthDay) {
      newMonth += 1;
      if (newMonth > 11) {
        newMonth = 0;
        newYear += 1;
      }
    }

    if (dateValue.prevMonthDay) {
      newMonth -= 1;
      if (newMonth < 0) {
        newMonth = 11;
        newYear -= 1;
      }
    }

    setSelect({
      day: dateValue.day,
      month: newMonth,
      year: newYear,
    });

    if (dateValue.nextMonthDay) {
      dispatch({
        type: NEXT_MONTH,
        payload: {
          nextMonth: currentDate.month + 1,
          date: dateValue.day,
        },
      });
    }
    if (dateValue.prevMonthDay) {
      dispatch({
        type: PREV_MONTH,
        payload: {
          prevMonth: currentDate.month - 1,
          date: dateValue.day,
        },
      });
    }

    const selectedDate = dayjs(
      `${currentDate.month + 1}-${dateValue.day}-${currentDate.year}`
    );
    console.log("selectedDate", selectedDate);
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
            date={currentDate.date}
            month={currentDate.month}
            currentDate={date}
            daysInPreviousMonth={currentDate.daysInPreviousMonth}
            handleDaySelect={handleDaySelect}
            select={select}
            dispatch={dispatch}
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
