import { useState } from "react";
import { connect } from "react-redux";
import DayRow from "./DayRow";

const CalendarDays = ({ dateObject }) => {
  // const totalDays = new Array()
  const currentDate = () => {
    return {
      firstDayOfMonth: dateObject.startOf("month").format("d"),
      month: dateObject.month(),
      daysInMonth: dateObject.daysInMonth(),
      year: dateObject.year(),
    };
  };

  const [totalDays, setTotalDays] = useState(
    new Array(currentDate().daysInMonth).fill(null).map((_, index) => {
      if (index >= 6) {
        return index + 1 - currentDate().day;
      }
      return 0;
    })
  );

  return (
    <>
      {new Array(6).fill(null).map((_, index) => {
        return (
          <DayRow
            key={index}
            index={index}
            firstDayOfMonth={currentDate().firstDayOfMonth}
            daysInMonth={currentDate().daysInMonth}
          />
        );
      })}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    dateObject: state.calendar.dateObject,
  };
};

export default connect(mapStateToProps, null)(CalendarDays);
