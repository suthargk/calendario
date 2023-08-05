import dayjs from "dayjs";
import getRowDays from "../../utils";
import { connect } from "react-redux";
import {
  NEXT_MONTH,
  PREV_MONTH,
  USER_SELECTED_DATE,
} from "../../store/actions";
import { fetchEvents } from "../../store/services";

const DayRow = ({
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  year,
  month,
  dispatch,
  eventList,
  daysInPreviousMonth,
}) => {
  const todayDate = dayjs();
  const days = getRowDays(
    rowIndex,
    firstDayOfMonth,
    daysInMonth,
    daysInPreviousMonth
  );
  const handleDaySelect = (dateValue) => {
    if (dateValue.nextMonthDay) {
      dispatch({
        type: NEXT_MONTH,
        payload: {
          nextMonth: month + 1,
        },
      });
    }
    if (dateValue.prevMonthDay) {
      dispatch({
        type: PREV_MONTH,
        payload: {
          prevMonth: month - 1,
        },
      });
    }

    const selectedDate = dayjs(`${month + 1}-${dateValue.day}-${year}`);
    dispatch({
      type: USER_SELECTED_DATE,
      payload: selectedDate,
    });

    // const minTimeUTC = selectedDate.startOf("day").utc().format();
    // const maxTimeUTC = selectedDate.endOf("day").utc().format();
    // fetchEvents({ timeMin: minTimeUTC, timeMax: maxTimeUTC });
  };

  return (
    <tr className="border border-gray-700">
      {days?.map((day, index) => {
        return (
          <td
            className={`text-center p-2 ${
              day.currentMonthDay &&
              day.day === todayDate.date() &&
              month === todayDate.month() &&
              year === todayDate.year() &&
              "border border-gray-600"
            }  ${day.prevMonthDay || day.nextMonthDay ? "opacity-20" : ""}`}
            onClick={() => handleDaySelect(day)}
            key={index}
          >
            {day.day}
          </td>
        );
      })}
    </tr>
  );
};

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

function mapStateToProps(state) {
  return {
    eventList: state.events.eventList,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DayRow);
