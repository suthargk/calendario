import React from "react";
import EmptyCalendarIcon from "../../../assets/icons/EmptyCalendarIcon";

const EmptyCalendarListSection = () => {
  return (
    <div
      style={{ borderWidth: 1 }}
      className="rounded-xl border-gray-200 flex justify-center items-center flex-col space-y-4 py-4 h-80"
    >
      <EmptyCalendarIcon width={50} height={50} />
      <div className="space-y-1 text-center">
        <h2 className="text-lg font-medium">No meetings for this day</h2>
        <p className="text-gray-600 font-light">
          Click on the button below to see the upcoming meetings.
        </p>
      </div>
    </div>
  );
};

export default EmptyCalendarListSection;
