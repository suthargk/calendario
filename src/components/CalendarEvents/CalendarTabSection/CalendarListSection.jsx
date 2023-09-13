import React from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";

const CalendarListSection = ({ tabActive, selectedDateEventList }) => {
  if (!selectedDateEventList.length) return <EmptyCalendarListSection />;
  return (
    <div className="space-y-2 pt-4">
      {selectedDateEventList.map((event) => {
        return <CalendarEventCard key={event.id} event={event} />;
      })}
    </div>
  );
};

export default CalendarListSection;
