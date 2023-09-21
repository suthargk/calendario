import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import { useState } from "react";

const Calendar = ({ hightLightWeeks }) => {
  const [reset, setReset] = useState(Math.random());
  return (
    <div
      key={reset}
      style={{ borderWidth: "1px" }}
      className="bg-white p-3 rounded-xl border-gray-200 select-none"
    >
      <CalendarTop setReset={setReset} />
      <CalendarTable />
    </div>
  );
};

export default Calendar;
