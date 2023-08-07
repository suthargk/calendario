import dayjs from "dayjs";

const DayItem = ({ day, month, year, select, handleDaySelect }) => {
  const todayDate = dayjs();

  const selectedDate = { day: day.day, month, year };

  return (
    <td
      style={
        day.currentMonthDate &&
        select.date === day.date &&
        select.month === month &&
        select.year === year
          ? {
              backgroundColor: `${
                select.date === todayDate.date() &&
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
        day.currentMonthDate &&
        day.date === todayDate.date() &&
        month === todayDate.month() &&
        year === todayDate.year() &&
        `${
          select.date ? "bg-white text-blue-500" : "bg-blue-500 text-white"
        }   `
      } 
      ${day.prevMonthDate || day.nextMonthDate ? "opacity-20" : ""}`}
      onClick={() => handleDaySelect(day)}
    >
      {day.date}
    </td>
  );
};

export default DayItem;
