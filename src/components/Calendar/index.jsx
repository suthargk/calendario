import { connect } from "react-redux";
import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDays from "./CalendarDays";

const Calendar = ({ dateObject }) => {
  return (
    <table>
      <thead>
        <CalendarWeekdays />
      </thead>
      <tbody>
        <CalendarDays />
      </tbody>
    </table>
  );
};

const mapStateToProps = (state) => {
  return {
    dateObject: state.calendar.dateObject,
  };
};

export default connect(mapStateToProps, null)(Calendar);
