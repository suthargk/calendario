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
  const { month: currentMonth, year: currentYear } = currentFullDate;
  const format = dayjs(new Date(currentYear, currentMonth)).format("MMMM YYYY");

  const handlePrevMonth = () => {
    const { prevMonth, prevYear } = getPrevMonthDate(
      currentMonth - 1,
      currentYear
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
      currentMonth + 1,
      currentYear
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

    fetchEventsAPI(nextYear, nextMonth);
    fetchHolidayAPI(nextYear, nextMonth);
  };

  const handleToday = () => {
    setReset(Math.random());
    dispatch({ type: RESET_CURRENT_TIME });

    const todaysMonth = dayjs().month();
    const todaysYear = dayjs().year();
    if (!(currentMonth === todaysMonth && currentYear === todaysYear)) {
      fetchEventsAPI(todaysYear, todaysMonth);
      fetchHolidayAPI(todaysYear, todaysMonth);
    }
  };

  const todayFullDate = dayjs().format("YYYY-MM-DD");
  const currentFullDateFormat = dayjs(
    new Date(currentYear, currentMonth, currentFullDate.date)
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
            todayFullDate === currentFullDateFormat
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
