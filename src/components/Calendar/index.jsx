import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import CalendarEvents from "../CalendarEvents";
import { useState } from "react";

const Calendar = () => {
  const [reset, setReset] = useState(Math.random());
  return (
    <div className="space-y-3" key={reset}>
      <div className="bg-white p-4 rounded-xl">
        <CalendarTop setReset={setReset} />
        <CalendarTable />
      </div>
      <CalendarEvents />
    </div>
  );
};

export default Calendar;
