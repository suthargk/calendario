import React, { useMemo, useState } from "react";
import EmptyCalendarListSection from "./EmptyCalendarListSection";
import CalendarEventCard from "./CalendarEventCard";
import CalendarHolidayCard from "./CalendarHolidayCard";
import { connect } from "react-redux";
import Loader from "../../common/Loader";
import { motion } from "framer-motion";

const CalendarListSection = ({
  tabActive,
  publicHolidays,
  isHolidaySectionLoading,
  isEventSectionLoading,
  selectedDateEventList,
}) => {
  const [isEventOpenId, setIsEventOpenId] = useState(null);

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
    <motion.div
      key={tabActive}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ height: "20.03rem" }}
      className="space-y-2 overflow-auto"
    >
      {getEventCards()}
    </motion.div>
  );
};

const mapStateToProps = (state) => {
  return {
    publicHolidays: state.events.publicHolidays,
  };
};

export default connect(mapStateToProps, null)(CalendarListSection);
