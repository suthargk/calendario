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
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";

const CalendarTop = ({ currentFullDate, dispatch, setReset, component }) => {
  const format = dayjs(
    `${currentFullDate.year}-${currentFullDate.month + 1}-01`
  ).format("MMMM YYYY");

  const handlePrevMonth = () => {
    const { prevMonth, prevYear } = getPrevMonthDate(
      currentFullDate.month - 1,
      currentFullDate.year
    );

    dispatch({
      type: PREV_MONTH,
      payload: {
        month: prevMonth,
        year: prevYear,
        date:
          prevMonth === dayjs().month() && prevYear === dayjs().year()
            ? dayjs().date()
            : 1,
      },
    });

    fetchEventsAPI(prevYear, prevMonth);
    fetchHolidayAPI(prevYear, prevMonth);
  };

  const handleNextMonth = () => {
    const { nextMonth, nextYear } = getNextMonthDate(
      currentFullDate.month + 1,
      currentFullDate.year
    );

    dispatch({
      type: NEXT_MONTH,
      payload: {
        month: nextMonth,
        year: nextYear,
        date:
          nextMonth === dayjs().month() && nextYear === dayjs().year()
            ? dayjs().date()
            : 1,
      },
    });

    fetchEventsAPI(nextYear, nextMonth + 1);
    fetchHolidayAPI(nextYear, nextMonth + 1);
  };

  const handleToday = () => {
    setReset(Math.random());
    dispatch({ type: RESET_CURRENT_TIME });

    const todaysMonth = dayjs().month();
    const todaysYear = dayjs().year();
    if (
      !(
        currentFullDate.month === todaysMonth &&
        currentFullDate.year === todaysYear
      )
    ) {
      fetchEventsAPI(todaysYear, todaysMonth + 1);
      fetchHolidayAPI(todaysYear, todaysMonth + 1);
    }
  };

  const todayFullDate = dayjs().format("YYYY-MM-DD");
  const currentFullDateInStr = dayjs(
    `${currentFullDate.year}-${currentFullDate.month + 1}-${
      currentFullDate.date
    }`
  ).format("YYYY-MM-DD");

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
          className={`py-1.5 px-3 text-base rounded-md ${
            todayFullDate === currentFullDateInStr
              ? "bg-gray-100 text-blue-500"
              : ""
          }`}
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
    currentFullDate: state.calendar,
  };
};

export default connect(mapStateToProps, mapToDispatch)(CalendarTop);
