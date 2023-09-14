import React from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import SortIcon from "../../../assets/icons/SortIcon";

const CalendarSearchBar = () => {
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
        style={{ borderWidth: 1 }}
        className="pl-9 pr-10 py-1.5 border-gray-200 rounded-xl w-full text-gray-600 placeholder:text-gray-400 placeholder:font-light placeholder:text-sm"
        placeholder="Search by name or day..."
      />
      <button className="z-10 w-9 absolute right-0 pl-1">
        <SortIcon className="text-gray-400 " />
      </button>
    </label>
  );
};

export default CalendarSearchBar;
