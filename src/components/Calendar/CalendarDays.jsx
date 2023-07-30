import { connect } from "react-redux";
import DayRow from "./DayRow";

const CalendarDays = ({ currentDate }) => {
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
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.currentDate,
  };
};

export default connect(mapStateToProps, null)(CalendarDays);
