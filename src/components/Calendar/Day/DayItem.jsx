import dayjs from "dayjs";

const DayItem = ({
  rowDate,
  currentMonth,
  currentYear,
  select,
  handleDaySelect,
  day,
}) => {
  const todayFullDateFormat = dayjs().format("YYYY-MM-DD");

  const selectFullDateFormat = dayjs(
    new Date(select.year, select.month, select.date)
  ).format("YYYY-MM-DD");

  const rowFullDateFormat = dayjs(
    new Date(currentYear, currentMonth, rowDate.date)
  ).format("YYYY-MM-DD");

  return (
    <td
      style={
        rowDate.isCurrentMonthDate && selectFullDateFormat === rowFullDateFormat
          ? {
              backgroundColor: `${
                selectFullDateFormat === todayFullDateFormat
                  ? "rgb(59 130 246)"
                  : "rgba(118,118,128, .12)"
              }`,
              color: `${
                selectFullDateFormat === todayFullDateFormat
                  ? "white"
                  : "currentColor"
              }`,
            }
          : {}
      }
      className={` text-center p-2 rounded cursor-pointer ${
        rowDate.isCurrentMonthDate && rowFullDateFormat === todayFullDateFormat
          ? "bg-white text-blue-500"
          : ""
      }
      ${
        rowDate.isPrevMonthDate || rowDate.isNextMonthDate ? "opacity-20" : ""
      }`}
      onClick={() => handleDaySelect(rowDate, day)}
    >
      {rowDate.date}
    </td>
  );
};

export default DayItem;
