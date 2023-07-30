import moment from "moment";
import { useState } from "react";

const CalendarWeekdays = () => {
  const [weekdaysShort] = useState(moment.weekdaysMin());
  return (
    <tr>
      {weekdaysShort.map((weekday, index) => {
        return <th key={index}>{weekday[0]}</th>;
      })}
    </tr>
  );
};

export default CalendarWeekdays;
