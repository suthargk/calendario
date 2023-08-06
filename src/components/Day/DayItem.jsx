import dayjs from "dayjs";

const DayItem = ({ day, month, year, select, handleDaySelect }) => {
  const todayDate = dayjs();

  return (
    <td
      style={
        day.currentMonthDay &&
        select.day === day.day &&
        select.month === month &&
        select.year === year
          ? {
              backgroundColor: `${
                select.day === todayDate.date()
                  ? "rgb(59 130 246)"
                  : "rgba(118,118,128, .12)"
              }`,
              color: `${
                select.day === todayDate.date() ? "white" : "currentColor"
              }`,
            }
          : {}
      }
      className={` text-center p-2  rounded cursor-pointer ${
        day.currentMonthDay &&
        day.day === todayDate.date() &&
        month === todayDate.month() &&
        year === todayDate.year() &&
        `${select.day ? "bg-white text-blue-500" : "bg-blue-500 text-white"}   `
      } 
      ${day.prevMonthDay || day.nextMonthDay ? "opacity-20" : ""}`}
      onClick={() => handleDaySelect(day)}
    >
      {day.day}
    </td>
  );
};

export default DayItem;
