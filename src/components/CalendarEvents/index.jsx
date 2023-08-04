import { connect } from "react-redux";

const CalendarEvents = ({ userSelectedDateEventList }) => {
  return (
    <div>
      {userSelectedDateEventList.map((event) => {
        return <div key={event.id}>{event.summary}</div>;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSelectedDateEventList: state.events.userSelectedDateEventList,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
