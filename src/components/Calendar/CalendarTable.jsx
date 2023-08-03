import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDays from "./CalendarDays";
import { useEffect } from "react";

const CalendarTable = () => {
  useEffect(() => {}, []);
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
