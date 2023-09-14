import { connect } from "react-redux";

import DayItem from "./DayItem";
import { getRowDays } from "../../../utils";

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
