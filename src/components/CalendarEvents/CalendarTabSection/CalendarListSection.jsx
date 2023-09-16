import React, { useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";

const CalendarListSection = ({ tabActive, selectedDateEventList }) => {
  const [isEventOpenId, setIsEventOpenId] = useState(null);

  const handleEventOpen = (id) => {
    isEventOpenId === id ? setIsEventOpenId(null) : setIsEventOpenId(id);
  };

  if (!selectedDateEventList.length) return <EmptyCalendarListSection />;

  return (
    <div style={{ height: "400px" }} className="space-y-2 overflow-auto">
      {selectedDateEventList.map((event) => {
        return (
          <CalendarEventCard
            key={event.id}
            event={event}
            handleEventOpen={handleEventOpen}
            isEventOpenId={isEventOpenId}
          />
        );
      })}
    </div>
  );
};

export default CalendarListSection;
