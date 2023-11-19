import React from "react";
import MeetingIcon from "../../../assets/icons/MeetingIcon";
import HolidayIcon from "../../../assets/icons/HolidayIcon";
import Tab from "./Tab";

const CalendarTabSeactionTop = ({ tabActive, handleTab }) => {
  return (
    <div
      style={{
        margin: "0px -12.8px",
      }}
    >
      <div
        style={{ borderTopWidth: 1, borderBottomWidth: 1 }}
        className="w-full border-gray-200 flex dark:border-slate-700"
      >
        <Tab
          icon={<MeetingIcon width={18} height={18} />}
          label="Meetings"
          tabActive={tabActive}
          handleTab={handleTab}
        />
        <Tab
          icon={<HolidayIcon width={18} height={18} />}
          label="Holidays"
          tabActive={tabActive}
          handleTab={handleTab}
        />
      </div>
    </div>
  );
};

export default CalendarTabSeactionTop;
