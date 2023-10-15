import React from "react";
import NextChevron from "../../../assets/icons/NextChevron";

const EventDetailOverlayTimeDuration = () => {
  return (
    <div className="space-y-1">
      <h2 className="font-medium text-xs">Duration</h2>

      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <h3 className="">
          <div className="">
            <span className="text-2xl font-medium mr-1">06:00</span>
            <span className="text-xs text-gray-700 font-medium">AM</span>
          </div>
          <div className="text-gray-700 text-xs font-medium">Aug 16, 2023</div>
        </h3>
        <NextChevron width={12} height={12} />
        <h3 className="">
          <div className="">
            <span className="text-2xl font-medium mr-1">07:00</span>
            <span className="text-xs text-gray-700 font-medium">AM</span>
          </div>
          <div className="text-gray-700 text-xs font-medium">Aug 16, 2023</div>
        </h3>
      </div>
    </div>
  );
};

export default EventDetailOverlayTimeDuration;
