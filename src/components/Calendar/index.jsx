import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import CalendarEvents from "../CalendarEvents";

const Calendar = () => {
  return (
    <div className="space-y-3">
      <div className="bg-white p-4 rounded-xl">
        <CalendarTop />
        <CalendarTable />
      </div>
      <CalendarEvents />
    </div>
  );
};

export default Calendar;
