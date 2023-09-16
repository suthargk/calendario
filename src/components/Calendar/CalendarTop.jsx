import { connect } from "react-redux";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import {
  NEXT_MONTH,
  PREV_MONTH,
  RESET_CURRENT_TIME,
} from "../../store/actions";
import dayjs from "dayjs";
import { getNextMonthDate, getPrevMonthDate } from "../../utils";
import { fetchEvents } from "../../store/services";

const CalendarTop = ({ currentDate, dispatch, setReset, component }) => {
  const format = dayjs(
    `${currentDate.year}-${currentDate.month + 1}-01`
  ).format("MMMM YYYY");

  const handlePrevMonth = () => {
    const { prevMonth, prevYear } = getPrevMonthDate(
      currentDate.month - 1,
      currentDate.year
    );

    dispatch({
      type: PREV_MONTH,
      payload: {
        month: prevMonth,
        year: prevYear,
        date: currentDate.date,
      },
    });

    fetchEvents({
      timeMin: dayjs(`${prevYear}-${prevMonth + 1}`)
        .startOf("month")
        .utc()
        .format(),
      timeMax: dayjs(`${prevYear}-${prevMonth + 1}`)
        .endOf("month")
        .utc()
        .format(),
    });
  };

  const handleNextMonth = () => {
    const { nextMonth, nextYear } = getNextMonthDate(
      currentDate.month + 1,
      currentDate.year
    );

    dispatch({
      type: NEXT_MONTH,
      payload: {
        month: nextMonth,
        year: nextYear,
        date: currentDate.date,
      },
    });

    fetchEvents({
      timeMin: dayjs(`${nextYear}-${nextMonth + 1}`)
        .startOf("month")
        .utc()
        .format(),
      timeMax: dayjs(`${nextYear}-${nextMonth + 1}`)
        .endOf("month")
        .utc()
        .format(),
    });
  };

  const handleToday = () => {
    setReset(Math.random());
    dispatch({ type: RESET_CURRENT_TIME });
  };

  const todayDate = new Date();
  const Component = component;

  if (component)
    return (
      <Component
        format={format}
        handleNextMonth={handleNextMonth}
        handlePrevMonth={handlePrevMonth}
      />
    );

  return (
    <div className="flex justify-between items-center p-2">
      <div className="text-lg font-semibold">{format}</div>
      <div className="flex justify-between items-center">
        <button
          style={{
            backgroundColor:
              currentDate.date === todayDate.getDate() &&
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
          <PrevChevron className="text-blue-500" />
        </button>
        <button className="p-2" onClick={handleNextMonth}>
          <NextChevron className="text-blue-500" />
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
