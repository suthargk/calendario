import { connect } from "react-redux";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
} from "../../store/actions";
import dayjs from "dayjs";

const CalendarTop = ({ currentDate, dispatch }) => {
  const format = dayjs(
    `${currentDate.year}-${currentDate.month + 1}-01`
  ).format("MMMM, YYYY");
  const handlePrevMonth = () => {
    dispatch({
      type: PREV_MONTH,
      payload: {
        prevMonth: currentDate.month - 1,
      },
    });
  };

  const handleNextMonth = () => {
    dispatch({
      type: NEXT_MONTH,
      payload: {
        nextMonth: currentDate.month + 1,
      },
    });
  };

  const handleToday = () => {
    dispatch({ type: RESET_CURRENT_TIME });
  };

  return (
    <div>
      <div>{format}</div>
      <button className="p-2 border border-gray-400" onClick={handleToday}>
        Today
      </button>
      <button className="p-2 border border-gray-400" onClick={handlePrevMonth}>
        prev
      </button>
      <button className="p-2 border border-gray-400" onClick={handleNextMonth}>
        Next
      </button>
    </div>
  );
};

const mapToDispatch = (dispatch) => {
  return { dispatch };
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.calendar,
  };
};

export default connect(mapStateToProps, mapToDispatch)(CalendarTop);
