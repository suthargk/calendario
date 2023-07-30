import { connect } from "react-redux";
import { NEXT_MONTH, PREV_MONTH } from "../../store/reducers/actions";

const CalendarTop = ({ currentDate, dispatch }) => {
  const { month, year } = currentDate;
  const handlePrevMonth = () => {
    dispatch({
      type: PREV_MONTH,
      payload: {
        prevMonth: month - 1,
      },
    });
  };

  const handleNextMonth = () => {
    dispatch({
      type: NEXT_MONTH,
      payload: {
        nextMonth: month + 1,
      },
    });
  };

  return (
    <div>
      {month}, {year}
      <button onClick={handlePrevMonth}>prev</button>
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
};

const mapToDispatch = (dispatch) => {
  return { dispatch };
};

export default connect(null, mapToDispatch)(CalendarTop);
