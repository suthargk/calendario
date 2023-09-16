import dayjs from "dayjs";

const DayItem = ({
  date,
  currentMonth,
  currentYear,
  select,
  handleDaySelect,
  day,
}) => {
  const todayDate = dayjs();

  return (
    <td
      style={
        date.currentMonthDate &&
        select.date === date.date &&
        select.month === currentMonth &&
        select.year === currentYear
          ? {
              backgroundColor: `${
                date.date === todayDate.date() &&
                select.month === todayDate.month() &&
                select.year === todayDate.year()
                  ? "rgb(59 130 246)"
                  : "rgba(118,118,128, .12)"
              }`,
              color: `${
                select.date === todayDate.date() &&
                select.month === todayDate.month() &&
                select.year === todayDate.year()
                  ? "white"
                  : "currentColor"
              }`,
            }
          : {}
      }
      className={` text-center p-2 rounded cursor-pointer ${
        date.currentMonthDate &&
        date.date === todayDate.date() &&
        currentMonth === todayDate.month() &&
        currentYear === todayDate.year() &&
        `${
          select.date ? "bg-white text-blue-500" : "bg-blue-500 text-white"
        }   `
      } 
      ${date.prevMonthDate || date.nextMonthDate ? "opacity-20" : ""}`}
      onClick={() => handleDaySelect(date, day)}
    >
      {date.date}
    </td>
  );
};

export default DayItem;
