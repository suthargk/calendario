import React, { memo } from "react";
import CalendarTop from "../Calendar/CalendarTop";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import MinimalisticCalendarBody from "./MinimalisticCalendarBody";

const MinimalisticCalendarTop = ({
  format,
  handlePrevMonth,
  handleNextMonth,
}) => {
  return (
    <div className="flex justify-between w-full rounded-full bg-gray-100 p-1.5">
      <button
        onClick={handlePrevMonth}
        className="p-1.5 rounded-full shadow bg-white"
      >
        <PrevChevron width={11} height={11} />
      </button>
      <div className="select-none">{format}</div>
      <button
        onClick={handleNextMonth}
        className="p-1.5 rounded-full shadow bg-white"
      >
        <NextChevron width={11} height={11} />
      </button>
    </div>
  );
};

const MinimalisticCalendar = ({
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
}) => {
  return (
    <div className="space-y-3">
      <CalendarTop
        component={MinimalisticCalendarTop}
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
      />
      <MinimalisticCalendarBody
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
      />
    </div>
  );
};

export default memo(MinimalisticCalendar);
