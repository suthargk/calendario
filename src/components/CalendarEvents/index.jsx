import { connect } from "react-redux";

const CalendarEvents = ({ selectedDateEventList }) => {
  return (
    <div>
      {selectedDateEventList.map((event) => {
        return (
          <div key={event.id}>
            <a href={event.hangoutLink} target="_blank">
              {event.summary}
            </a>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDateEventList: state.events.selectedDateEventList,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
