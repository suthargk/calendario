import React, { useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";
import CalendarHolidayCard from "./CalendarHolidayCard";

const CalendarListSection = ({
  tabActive,
  selectedDateEventList,
  publicHolidays,
  isLoading,
}) => {
  const [isEventOpenId, setIsEventOpenId] = useState(null);

  const getEventCards = () => {
    switch (tabActive) {
      case "Meetings":
        if (!selectedDateEventList.length) return <EmptyCalendarListSection />;
        return (
          <>
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
          </>
        );

      case "Holidays":
        return (
          <>
            {publicHolidays.map((holiday) => {
              return <CalendarHolidayCard key={holiday.id} holiday={holiday} />;
            })}
          </>
        );
      default:
        break;
    }
  };

  const handleEventOpen = (id) => {
    isEventOpenId === id ? setIsEventOpenId(null) : setIsEventOpenId(id);
  };

  if (isLoading)
    return (
      <div
        style={{ height: "20.2rem" }}
        className="flex justify-center items-center"
      >
        <SpinnerIcon width={40} height={40} />
      </div>
    );

  return (
    <div style={{ height: "20.2rem" }} className="space-y-2 overflow-auto">
      {getEventCards()}
    </div>
  );
};

export default CalendarListSection;
