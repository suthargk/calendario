import dayjs from "dayjs";

const DayItem = ({
  rowDate,
  currentMonth,
  currentYear,
  select,
  handleDaySelect,
  day,
}) => {
  const todayFullDate = dayjs().format("YYYY-MM-DD");

  const selectFullDate = dayjs(
    `${select.year}-${select.month + 1}-${select.date} `
  ).format("YYYY-MM-DD");

  const rowFullDate = dayjs(
    `${currentYear}-${currentMonth + 1}-${rowDate.date}`
  ).format("YYYY-MM-DD");

  return (
    <td
      style={
        rowDate.isCurrentMonthDate && selectFullDate === rowFullDate
          ? {
              backgroundColor: `${
                selectFullDate === todayFullDate
                  ? "rgb(59 130 246)"
                  : "rgba(118,118,128, .12)"
              }`,
              color: `${
                selectFullDate === todayFullDate ? "white" : "currentColor"
              }`,
            }
          : {}
      }
      className={` text-center p-2 rounded cursor-pointer ${
        rowDate.isCurrentMonthDate && rowFullDate === todayFullDate
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
