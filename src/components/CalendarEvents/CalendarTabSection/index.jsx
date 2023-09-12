import React from "react";
import CalendarTabSeactionTop from "./CalendarTabSeactionTop";

const CalendarTabSection = ({ tabActive, handleTab }) => {
  return (
    <div className="w-full">
      <CalendarTabSeactionTop tabActive={tabActive} handleTab={handleTab} />
    </div>
  );
};

export default CalendarTabSection;
