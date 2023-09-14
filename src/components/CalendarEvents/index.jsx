import { connect } from "react-redux";
import { useState } from "react";
import CalendarTabSection from "./CalendarTabSection";
import CalendarListSection from "./CalendarTabSection/CalendarListSection";
import CalendarSearchBar from "./CalendarSearchBar";

const CalendarEvents = ({ selectedDateEventList }) => {
  const [tabActive, setTabActive] = useState("Meetings");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };
  return (
    <div className="space-y-4">
      <CalendarSearchBar />
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
