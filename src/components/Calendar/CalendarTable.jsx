import CalendarWeekdays from "./CalendarWeekdays";
import CalendarDays from "./CalendarDays";

const CalendarTable = ({
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
}) => {
  return (
    <table className="mx-auto w-full">
      <thead>
        <CalendarWeekdays />
      </thead>
      <tbody>
        <CalendarDays
          setIsEventSectionLoading={setIsEventSectionLoading}
          setIsHolidaySectionLoading={setIsHolidaySectionLoading}
        />
      </tbody>
    </table>
  );
};

export default CalendarTable;
