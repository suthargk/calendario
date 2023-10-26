import { useMemo, useState } from "react";
import CalendarTabSection from "./CalendarTabSection";
import CalendarListSection from "./CalendarTabSection/CalendarListSection";
import CalendarSearchBar from "./CalendarSearchBar";
import { getSelectedDateEvents } from "../../utils";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { SEARCH_VALUE } from "../../store/actions";

const CalendarEvents = ({
  isEventSectionLoading,
  isHolidaySectionLoading,
  currentFullDate,
  confirmedEventList,
  cancelledEventList,
  searchValue,
  dispatch,
}) => {
  const [tabActive, setTabActive] = useState("Meetings");

  const handleTab = (tabName) => {
    setTabActive(tabName);
  };

  const handleChange = (value) => {
    dispatch({
      type: SEARCH_VALUE,
      payload: value,
    });
  };

  const currentFullDateFormat = dayjs(
    new Date(currentFullDate.year, currentFullDate.month, currentFullDate.date)
  ).format("YYYY-MM-DD");

  const selectedDateEventList = useMemo(() => {
    const list = getSelectedDateEvents(
      confirmedEventList,
      cancelledEventList,
      currentFullDate
    );

    const searchList = list.filter((item) =>
      item.summary.toLowerCase().includes(searchValue.toLowerCase())
    );

    return searchList;
  }, [confirmedEventList, currentFullDateFormat, searchValue]);

  return (
    <div className="space-y-3">
      <CalendarSearchBar
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <CalendarTabSection tabActive={tabActive} handleTab={handleTab} />
      <CalendarListSection
        tabActive={tabActive}
        isEventSectionLoading={isEventSectionLoading}
        isHolidaySectionLoading={isHolidaySectionLoading}
        selectedDateEventList={selectedDateEventList}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentFullDate: state.calendar,
    confirmedEventList: state.events.confirmedEventList,
    cancelledEventList: state.events.cancelledEventList,
    searchValue: state.calendar.searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarEvents);
