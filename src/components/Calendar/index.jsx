import CalendarTable from "./CalendarTable";
import CalendarTop from "./CalendarTop";
import { memo } from "react";

const Calendar = ({
  hightLightWeeks,
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
  setReset,
  reset,
}) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      key={reset}
      style={{ borderWidth: "1px" }}
      className="bg-white p-3 shadow-2xl rounded-xl border-gray-200 select-none w-[320px] mt-11 ml-3.5"
    >
      <CalendarTop
        setReset={setReset}
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
      />
      <CalendarTable
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
      />
    </div>
  );
};

export default memo(Calendar);
