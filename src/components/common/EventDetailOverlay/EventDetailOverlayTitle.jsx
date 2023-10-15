import React from "react";

const EventDetailOverlayTitle = ({ summary, organizer }) => {
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
        <span>{summary}</span>
        <div className="w-full text-gray-500 text-xs font-normal gap-1.5 flex items-center  flex-wrap">
          <span>
            by {organizer.displayName ? organizer.displayName : organizer.email}{" "}
          </span>
          <span className="inline-block bg-green-100 rounded-full text-green-700 text-[10px] px-2 self-start">
            Confirmed
          </span>
        </div>
      </h1>
    </div>
  );
};

export default EventDetailOverlayTitle;
