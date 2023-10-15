import React from "react";

const EventDetailOverlayTitle = ({ summary, organizer }) => {
  return (
    <div className="flex gap-2">
      <div className="w-1/6">
        <div className="rounded-xl flex flex-col border border-gray-200 overflow-hidden h-12 w-12">
          <span className="p-0.5 px-2.5 text-center text-xs bg-red-500 text-white ">
            JUL
          </span>
          <span className="p-0.5 px-2.5 text-sm text-center">17</span>
        </div>
      </div>
      <h1 className="font-medium w-4/5">
        {summary}{" "}
        <div className="text-gray-500 text-xs font-normal">
          by {organizer.displayName ? organizer.displayName : organizer.email}
        </div>
      </h1>
    </div>
  );
};

export default EventDetailOverlayTitle;
