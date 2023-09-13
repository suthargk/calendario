import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import CalendarEvents from "../CalendarEvents";
import { useState } from "react";

const Calendar = ({ hightLightWeeks }) => {
  const [reset, setReset] = useState(Math.random());
  return (
    <div className="space-y-5" key={reset}>
      <div
        style={{ borderWidth: "1px" }}
        className="bg-white p-3 rounded-xl border-gray-200"
      >
        <CalendarTop setReset={setReset} />
        <CalendarTable />
      </div>
      <CalendarEvents />
    </div>
  );
};

export default Calendar;
