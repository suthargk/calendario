import { connect } from "react-redux";
import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";

const Calendar = ({ currentDate }) => {
  return (
    <div>
      <CalendarTop currentDate={currentDate} />
      <CalendarTable />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.currentDate,
  };
};

export default connect(mapStateToProps, null)(Calendar);
