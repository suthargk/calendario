import { connect } from "react-redux";
import CalendarSearch from "./CalendarSearch";
import { useState } from "react";
import CalendarTabSection from "./CalendarTabSection";
import CalendarListSection from "./CalendarTabSection/CalendarListSection";

const CalendarEvents = ({ selectedDateEventList }) => {
  const [tabActive, setTabActive] = useState("Meetings");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };
  return (
    <div className="space-y-2">
      <CalendarSearch />
      <CalendarTabSection tabActive={tabActive} handleTab={handleTab} />
      <CalendarListSection
        tabActive={tabActive}
        selectedDateEventList={selectedDateEventList}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedDateEventList: state.events.selectedDateEventList,
  };
};

export default connect(mapStateToProps, null)(CalendarEvents);
