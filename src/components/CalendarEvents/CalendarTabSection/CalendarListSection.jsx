import React, { useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";

const CalendarListSection = ({ tabActive, selectedDateEventList }) => {
  const [isEventOpen, setIsEventOpen] = useState(null);

  const handleEventOpen = (id) => {
    if (isEventOpen === id) {
      setIsEventOpen(null);
    } else {
      setIsEventOpen(id);
    }
  };
  if (!selectedDateEventList.length) return <EmptyCalendarListSection />;
  return (
    <div className="space-y-2 h-72 overflow-auto">
      {selectedDateEventList.map((event) => {
        return (
          <CalendarEventCard
            key={event.id}
            event={event}
            handleEventOpen={handleEventOpen}
            isEventOpen={isEventOpen}
          />
        );
      })}
    </div>
  );
};

export default CalendarListSection;
