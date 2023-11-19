import React from "react";
import PrevChevron from "../../../assets/icons/PrevChevron";

const PageHeader = ({ setIsEventDetailOverlayOpen }) => {
  return (
    <div className="p-2.5 border-b border-gray-200 flex items-center dark:bg-slate-800 dark:border-gray-700">
      <button
        className="flex items-center gap-1 text-blue-500 dark:text-slate-300"
        onClick={() => setIsEventDetailOverlayOpen(false)}
      >
        <PrevChevron width={14} height={14} />
        <span className="text-sm">Calendar</span>
      </button>
      <div className=""></div>
    </div>
  );
};

export default PageHeader;
