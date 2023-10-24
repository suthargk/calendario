import React, { useMemo, useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";
import CalendarHolidayCard from "./CalendarHolidayCard";
import { connect } from "react-redux";
import { getSelectedDateEvents } from "../../../utils";
import dayjs from "dayjs";
import Loader from "../../common/Loader";

const CalendarListSection = ({
  tabActive,
  cancelledEventList,
  confirmedEventList,
  publicHolidays,
  currentFullDate,
  isHolidaySectionLoading,
  isEventSectionLoading,
}) => {
  const [isEventOpenId, setIsEventOpenId] = useState(null);

  const currentFullDateFormat = dayjs(
    new Date(currentFullDate.year, currentFullDate.month, currentFullDate.date)
  ).format("YYYY-MM-DD");

  const selectedDateEventList = useMemo(() => {
    return getSelectedDateEvents(
      confirmedEventList,
      cancelledEventList,
      currentFullDate
    );
  }, [confirmedEventList, currentFullDateFormat]);

  const getEventCards = () => {
    switch (tabActive) {
      case "Meetings":
        if (!selectedDateEventList.length) return <EmptyCalendarListSection />;
        return (
          <>
            {selectedDateEventList.map((event, index) => {
              return (
                <CalendarEventCard
                  key={event.id}
                  event={event}
                  index={index}
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

  if (isEventSectionLoading || isHolidaySectionLoading)
    return <Loader style={{ height: "20.03rem" }} />;

  return (
    <div style={{ height: "20.03rem" }} className="space-y-2 overflow-auto">
      {getEventCards()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentFullDate: state.calendar,
    confirmedEventList: state.events.confirmedEventList,
    cancelledEventList: state.events.cancelledEventList,
    publicHolidays: state.events.publicHolidays,
  };
};

export default connect(mapStateToProps, null)(CalendarListSection);
