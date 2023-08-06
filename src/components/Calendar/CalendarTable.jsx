import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDays from "./CalendarDays";

const CalendarTable = () => {
  return (
    <table className="mx-auto w-full">
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
