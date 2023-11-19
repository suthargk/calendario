import React from "react";

import HolidayIcon from "../../../assets/icons/HolidayIcon";
import MeetingIcon from "../../../assets/icons/MeetingIcon";
import Tab from "./Tab";

const CalendarTabSectionTop = ({ tabActive, handleTab }) => {
  return (
    <div
      style={{
        margin: "0px -12.8px",
      }}
    >
      <div
        style={{ borderTopWidth: 1, borderBottomWidth: 1 }}
        className="w-full px-3 border-gray-200 flex dark:border-slate-700"
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

export default CalendarTabSectionTop;
