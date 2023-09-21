import React, { useMemo, useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";
import SpinnerIcon from "../../../assets/icons/SpinnerIcon";
import CalendarHolidayCard from "./CalendarHolidayCard";
import { connect } from "react-redux";
import { getSelectedDateEvents } from "../../../utils";
import dayjs from "dayjs";

const CalendarListSection = ({
  tabActive,
  eventList,
  publicHolidays,
  currentFullDate,
  isLoading,
}) => {
  const [isEventOpenId, setIsEventOpenId] = useState(null);

  const currentFullDateFormat = dayjs(
    new Date(currentFullDate.year, currentFullDate.month, currentFullDate.date)
  ).format("YYYY-MM-DD");

  const selectedDateEventList = useMemo(() => {
    return getSelectedDateEvents(eventList, currentFullDate);
  }, [eventList, currentFullDateFormat]);

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

const mapStateToProps = (state) => {
  return {
    currentFullDate: state.calendar,
    eventList: state.events.eventList,
    publicHolidays: state.events.publicHolidays,
  };
};

export default connect(mapStateToProps, null)(CalendarListSection);
