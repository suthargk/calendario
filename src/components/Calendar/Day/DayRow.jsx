import { connect } from "react-redux";
import DayItem from "./DayItem";
import { getRowDates } from "../../../utils";

const DayRow = ({
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  currentYear,
  currentMonth,
  dispatch,
  daysInPreviousMonth,
  handleDaySelect,
  select,
}) => {
  const rowDates = getRowDates(
    rowIndex,
    firstDayOfMonth,
    daysInMonth,
    daysInPreviousMonth
  );

  return (
    <tr className="text-gray-800">
      {rowDates?.map((rowDate, index) => {
        return (
          <DayItem
            key={index}
            rowDate={rowDate}
            currentYear={currentYear}
            currentMonth={currentMonth}
            dispatch={dispatch}
            handleDaySelect={handleDaySelect}
            select={select}
            day={index}
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
