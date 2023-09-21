import { connect } from "react-redux";
import { useState } from "react";
import CalendarTabSection from "./CalendarTabSection";
import CalendarListSection from "./CalendarTabSection/CalendarListSection";
import CalendarSearchBar from "./CalendarSearchBar";
import { fetchHolidays } from "../../store/services";
import dayjs from "dayjs";

const CalendarEvents = ({
  selectedDateEventList,
  currentMonth,
  currentYear,
  daysInMonth,
  publicHolidays,
}) => {
  const [tabActive, setTabActive] = useState("Meetings");
  const [isLoading, setIsLoading] = useState(false);

  const handleTab = (tabName) => {
    setTabActive(tabName);

    // if (tabName === "Holidays") {
    //   fetchHolidays({
    //     setIsLoading,
    //     timeMin: dayjs(`${currentYear}-${currentMonth + 1}-01`)
    //       .utc()
    //       .format(),
    //     timeMax: dayjs(`${currentYear}-${currentMonth + 1}-${daysInMonth}`)
    //       .utc()
    //       .format(),
    //   });
    // }
  };

  return (
    <div className="space-y-4">
      <CalendarSearchBar />
      <CalendarTabSection tabActive={tabActive} handleTab={handleTab} />
      <CalendarListSection
        tabActive={tabActive}
        selectedDateEventList={selectedDateEventList}
        publicHolidays={publicHolidays}
        isLoading={isLoading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDateEventList: state.events.selectedDateEventList,
    publicHolidays: state.events.publicHolidays,
    currentMonth: state.calendar.month,
    currentYear: state.calendar.year,
    daysInMonth: state.calendar.daysInMonth,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
