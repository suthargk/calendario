import dayjs from "dayjs";
import getRowDays from "../../utils";
import { connect } from "react-redux";
import { SELECTED_DATE } from "../../store/actions";
import { fetchEvents } from "../../store/services";

const DayRow = ({
  rowIndex,
  firstDayOfMonth,
  daysInMonth,
  year,
  month,
  dispatch,
}) => {
  const todayDate = dayjs();
  const days = getRowDays(rowIndex, firstDayOfMonth, daysInMonth);
  const handleDaySelect = (dateValue) => {
    const selectedDate = dayjs(`${month + 1}-${dateValue}-${year}`);
    const minTimeUTC = selectedDate.startOf("day").utc().format();
    const maxTimeUTC = selectedDate.endOf("day").utc().format();

    fetchEvents({ timeMin: minTimeUTC, timeMax: maxTimeUTC });
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
            }`}
            onClick={() => handleDaySelect(day)}
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

export default connect(null, mapDispatchToProps)(DayRow);
