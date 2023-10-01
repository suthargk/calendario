import React from "react";
import CalendarSecondaryIcon from "../../assets/icons/CalendarSecondaryIcon";
import FullCalendarIcon from "../../assets/icons/FullCalendarIcon";

const CalendarHeader = ({ handleFullCalendar, isFullCalendar }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <CalendarSecondaryIcon
          className="text-gray-600"
          width={24}
          height={24}
        />
        <h4 className="font-medium">Calendario</h4>
      </div>
      <div className="flex gap-2">
        {/* <TodayCalendarIcon width={24} height={24} /> */}
        <div className="border border-gray-150 text-xs px-2 py-0.5 rounded-lg flex justify-center items-center">
          Today
        </div>
        <button onClick={handleFullCalendar}>
          <FullCalendarIcon width={24} height={24} />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
