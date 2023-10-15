import React from "react";
import PrevChevron from "../../../assets/icons/PrevChevron";

const EventDetailOverlayHeader = () => {
  return (
    <div className="p-2.5 border-b border-gray-200 flex items-center">
      <button className="flex items-center gap-1 text-blue-500">
        <PrevChevron width={14} height={14} />
        <span className="text-sm">Calendar</span>
      </button>
      <div className=""></div>
    </div>
  );
};

export default EventDetailOverlayHeader;
