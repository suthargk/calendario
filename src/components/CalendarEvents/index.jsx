import { useState } from "react";
import CalendarTabSection from "./CalendarTabSection";
import CalendarListSection from "./CalendarTabSection/CalendarListSection";
import CalendarSearchBar from "./CalendarSearchBar";

const CalendarEvents = ({ isLoading }) => {
  const [tabActive, setTabActive] = useState("Meetings");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };

  return (
    <div className="space-y-4">
      <CalendarSearchBar />
      <CalendarTabSection tabActive={tabActive} handleTab={handleTab} />
      <CalendarListSection tabActive={tabActive} isLoading={isLoading} />
    </div>
  );
};

export default CalendarEvents;
