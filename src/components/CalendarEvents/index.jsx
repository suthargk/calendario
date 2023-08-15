import { connect } from "react-redux";

const CalendarEvents = ({ selectedDateEventList }) => {
  return (
    <div>
      <h3
        className="uppercase px-2 mb-1 text-sm"
        style={{ color: "rgba(60, 60, 67, .6)" }}
      >
        Today
      </h3>
      <div className="bg-white p-4 rounded-xl font-normal">
        {selectedDateEventList.map((event) => {
          return (
            <div key={event.id}>
              <a href={event?.hangoutLink} target="_blank">
                {event.summary}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDateEventList: state.events.selectedDateEventList,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
