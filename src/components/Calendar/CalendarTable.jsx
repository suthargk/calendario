import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDays from "./CalendarDays";

const CalendarTable = () => {
  return (
    <table>
      <thead>
        <CalendarWeekdays />
      </thead>
      <tbody>
        <CalendarDays />
      </tbody>
    </table>
  );
};

export default CalendarTable;
