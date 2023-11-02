import React from "react";
import NextChevron from "../../../assets/icons/NextChevron";

const EventDetailOverlayTimeDuration = ({ startTimeFormat, endTimeFormat }) => {
  return (
    <div className="space-y-1">
      <h2 className="font-medium text-xs">Duration</h2>

      <div className="flex items-center gap-4 border-b border-gray-200 pb-4 dark:border-slate-700">
        <h3 className="">
          <div className="">
            <span className="text-2xl font-medium mr-1">
              {startTimeFormat.time.split(" ")[0]}
            </span>
            <span className="text-xs text-gray-700 font-medium dark:text-slate-400">
              {startTimeFormat.time.slice(-2)}
            </span>
          </div>
          <div className="text-gray-700 text-xs font-medium dark:text-slate-400">
            {startTimeFormat.fullDate}
          </div>
        </h3>
        <NextChevron width={12} height={12} />
        <h3 className="">
          <div className="">
            <span className="text-2xl font-medium mr-1">
              {" "}
              {endTimeFormat.time.split(" ")[0]}
            </span>
            <span className="text-xs text-gray-700 font-medium dark:text-slate-400">
              {endTimeFormat.time.slice(-2)}
            </span>
          </div>
          <div className="text-gray-700 text-xs font-medium dark:text-slate-400">
            {endTimeFormat.fullDate}
          </div>
        </h3>
      </div>
    </div>
  );
};

export default EventDetailOverlayTimeDuration;
