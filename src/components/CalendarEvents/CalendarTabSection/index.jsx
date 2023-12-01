import React from "react";

import CalendarTabSectionTop from "./CalendarTabSectionTop";

const CalendarTabSection = ({ tabActive, handleTab }) => {
  return (
    <div className="w-full">
      <CalendarTabSectionTop tabActive={tabActive} handleTab={handleTab} />
    </div>
  );
};

export default CalendarTabSection;
