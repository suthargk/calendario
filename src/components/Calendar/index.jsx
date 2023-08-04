import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import CalendarEvents from "../CalendarEvents";

const Calendar = () => {
  return (
    <div>
      <CalendarTop />
      <CalendarTable />
      <CalendarEvents />
    </div>
  );
};

export default Calendar;
