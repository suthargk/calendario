import { useState } from "react";

const CalendarWeekdays = () => {
  const [weekdays] = useState([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]);
  return (
    <tr>
      {weekdays.map((weekday, index) => {
        return <th key={index}>{weekday[0]}</th>;
      })}
    </tr>
  );
};

export default CalendarWeekdays;
