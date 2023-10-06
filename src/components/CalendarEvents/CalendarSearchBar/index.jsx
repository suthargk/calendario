import React, { useState } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import SortIcon from "../../../assets/icons/SortIcon";
import ToolTip from "../../common/ToolTip";

const CalendarSearchBar = () => {
  const [onSortMouseOver, setOnSortMouseOver] = useState(false);
  return (
    <label
      htmlFor="search-event"
      className="w-full flex items-center relative divide-x"
    >
      <SearchIcon className="text-gray-400 z-10 absolute left-2" />
      <input
        id="#search-event"
        type="text"
        name="search-event"
        style={{ borderWidth: 1, paddingBottom: "5px", paddingTop: "5px" }}
        className="pl-9 pr-10 py-1.5 border-gray-200 rounded-xl w-full text-gray-600 placeholder:text-gray-400 placeholder:font-light placeholder:text-sm focus:outline-2 focus:outline-blue-500"
        placeholder="Search by name or day..."
      />
      <button
        className="z-10 w-9 absolute right-0 pl-1 h-full focus:outline-2 focus:outline-blue-500"
        onMouseEnter={() => setOnSortMouseOver(true)}
        onMouseLeave={() => setOnSortMouseOver(false)}
        onFocus={() => setOnSortMouseOver(true)}
        onBlur={() => setOnSortMouseOver(false)}
      >
        <SortIcon className="text-gray-400 " />
        {onSortMouseOver && <ToolTip width="w-8" text="Sort" />}
      </button>
    </label>
  );
};

export default CalendarSearchBar;
