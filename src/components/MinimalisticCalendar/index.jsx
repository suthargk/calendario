import React, { memo, useEffect, useState } from "react";
import CalendarTop from "../Calendar/CalendarTop";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import MinimalisticCalendarBody from "./MinimalisticCalendarBody";
import ToolTip from "../common/ToolTip";

const MinimalisticCalendarTop = ({
  format,
  handlePrevMonth,
  handleNextMonth,
}) => {
  const [onPrevMonthMouseOver, setOnPrevMonthMouseOver] = useState(false);
  const [onNextMonthMouseOver, setOnNextMonthMouseOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOnNextMonthMouseOver(false);
      setOnPrevMonthMouseOver(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onPrevMonthMouseOver, onNextMonthMouseOver]);

  return (
    <div
      style={{ padding: "5px" }}
      className="flex justify-between w-full rounded-full bg-gray-100 dark:bg-slate-800"
    >
      <button
        onClick={handlePrevMonth}
        className="relative p-1.5 rounded-full shadow bg-white dark:bg-slate-700 focus:outline-2 focus:outline-blue-500"
        onMouseEnter={() => setOnPrevMonthMouseOver(true)}
        onMouseLeave={() => setOnPrevMonthMouseOver(false)}
        onFocus={() => setOnPrevMonthMouseOver(true)}
        onBlur={() => setOnPrevMonthMouseOver(false)}
      >
        <PrevChevron width={11} height={11} />
        {onPrevMonthMouseOver && (
          <ToolTip direction="left" text="Previous month" />
        )}
      </button>
      <div style={{ fontSize: "15px" }} className="select-none">
        {format}
      </div>
      <button
        onClick={handleNextMonth}
        className="relative p-1.5 rounded-full shadow bg-white dark:bg-slate-700 focus:outline-2 focus:outline-blue-500"
        onMouseEnter={() => setOnNextMonthMouseOver(true)}
        onMouseLeave={() => setOnNextMonthMouseOver(false)}
        onFocus={() => setOnNextMonthMouseOver(true)}
        onBlur={() => setOnNextMonthMouseOver(false)}
      >
        <NextChevron width={11} height={11} />
        {onNextMonthMouseOver && (
          <ToolTip direction="right" text="Next month" />
        )}
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
