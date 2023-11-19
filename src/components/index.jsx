import React, { useState } from "react";

import CalendarEvents from "./CalendarEvents";
import CalendarHeader from "./CalendarHeader";
import MinimalisticCalendar from "./MinimalisticCalendar";

const CalendarApp = ({
  setIsSettingPageOpen,
  isEventSectionLoading,
  isHolidaySectionLoading,
  setIsHolidaySectionLoading,
  setIsEventSectionLoading,
}) => {
  const [reset, setReset] = useState(Math.random());

  return (
    <div className="space-y-3">
      <CalendarHeader
        reset={reset}
        setReset={setReset}
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
        handleSettingPage={() => setIsSettingPageOpen(true)}
      />
      <MinimalisticCalendar
        setIsEventSectionLoading={setIsEventSectionLoading}
        setIsHolidaySectionLoading={setIsHolidaySectionLoading}
      />
      <CalendarEvents
        isEventSectionLoading={isEventSectionLoading}
        isHolidaySectionLoading={isHolidaySectionLoading}
      />
    </div>
  );
};

export default CalendarApp;
