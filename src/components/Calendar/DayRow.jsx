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
  const handleDaySelect = (dateValue, index) => {
    console.log(dateValue, index);
    if (15 > dateValue && rowIndex > 3) {
      dispatch({
        type: NEXT_MONTH,
        payload: {
          nextMonth: month + 1,
        },
      });
    }

    if (index < firstDayOfMonth && rowIndex === 0) {
      dispatch({
        type: PREV_MONTH,
        payload: {
          prevMonth: month - 1,
        },
      });
    }
    const selectedDate = dayjs(`${month + 1}-${dateValue}-${year}`);

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
            className={`text-center ${
              day === todayDate.date() &&
              month === todayDate.month() &&
              year === todayDate.year() &&
              "border border-gray-600"
            }  ${
              (index < firstDayOfMonth && rowIndex === 0) ||
              (15 > day && rowIndex > 3)
                ? "opacity-20"
                : ""
            }`}
            onClick={() => handleDaySelect(day, index)}
            key={index}
          >
            {day}
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
