import { connect } from "react-redux";

const CalendarEvents = ({ eventList }) => {
  console.log(eventList);
  return <div></div>;
};

const mapStateToProps = (state) => {
  return {
    eventList: state.events.eventList,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
