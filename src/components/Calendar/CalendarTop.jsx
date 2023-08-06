import { connect } from "react-redux";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
} from "../../store/actions";
import dayjs from "dayjs";

const CalendarTop = ({ currentDate, dispatch, setReset }) => {
  const format = dayjs(
    `${currentDate.year}-${currentDate.month + 1}-01`
  ).format("MMMM YYYY");
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
    setReset(Math.random());
    dispatch({ type: RESET_CURRENT_TIME });
  };

  const todayDate = new Date();
  return (
    <div
      // style={{ margin: "0 5.6px" }}
      className="flex justify-between items-center p-2"
    >
      <div className="text-lg font-semibold">{format}</div>
      <div className="flex justify-between items-center">
        <button
          style={{
            backgroundColor:
              currentDate.month === todayDate.getMonth() &&
              currentDate.year === todayDate.getFullYear() &&
              "rgba(118,118,128, .12)",
          }}
          className="py-1.5 px-3 text-base rounded-md"
          onClick={handleToday}
        >
          Today
        </button>
        <button className="p-2" onClick={handlePrevMonth}>
          <PrevChevron />
        </button>
        <button className="p-2" onClick={handleNextMonth}>
          <NextChevron />
        </button>
      </div>
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
