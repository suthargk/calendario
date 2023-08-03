import { connect } from "react-redux";
import DayRow from "./DayRow";

const CalendarDays = ({ currentDate, date }) => {
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
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.calendar,
    date: state.calendar.currentDate,
  };
};

export default connect(mapStateToProps, null)(CalendarDays);
