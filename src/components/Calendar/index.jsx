import { connect } from "react-redux";
import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import CalendarEvents from "../CalendarEvents";

const Calendar = ({ currentDate }) => {
  return (
    <div>
      <CalendarTop currentDate={currentDate} />
      <CalendarTable />
      <CalendarEvents />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.calendar,
  };
};

export default connect(mapStateToProps, null)(Calendar);
