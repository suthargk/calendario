import { connect } from "react-redux";
import getRowDays from "../../utils";
import DayItem from "./DayItem";

const DayRow = ({
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  year,
  month,
  dispatch,
  daysInPreviousMonth,
  handleDaySelect,
  select,
}) => {
  const days = getRowDays(
    rowIndex,
    firstDayOfMonth,
    daysInMonth,
    daysInPreviousMonth
  );

  return (
    <tr className="text-gray-800">
      {days?.map((day, index) => {
        return (
          <DayItem
            key={index}
            day={day}
            month={month}
            year={year}
            dispatch={dispatch}
            handleDaySelect={handleDaySelect}
            select={select}
          />
        );
      })}
    </tr>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(null, mapDispatchToProps)(DayRow);
