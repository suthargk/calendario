import React from "react";
import { getMeetingStatus } from "../../../utils";

const EventDetailOverlayTitle = ({ summary, organizer, meetingStatus }) => {
  return (
    <div className="flex gap-2">
      {/* <div className="w-1/6">
        <div className="rounded-xl flex flex-col border border-gray-200 overflow-hidden h-12 w-12">
          <span className="p-0.5 px-2.5 text-center text-xs bg-red-500 text-white ">
            JUL
          </span>
          <span className="p-0.5 px-2.5 text-sm text-center">17</span>
        </div>
      </div> */}
      <h1 className="font-medium w-full">
        <span>{summary ? summary : "(No title)"}</span>
        <div className="w-full text-gray-500 dark:text-slate-400 text-xs font-normal gap-1.5 flex items-center  flex-wrap">
          <span>
            by {organizer.displayName ? organizer.displayName : organizer.email}{" "}
          </span>

          {getMeetingStatus(meetingStatus)}
        </div>
      </h1>
    </div>
  );
};

export default EventDetailOverlayTitle;
