import React from "react";
import SearchIcon from "../../assets/icons/SearchIcon";

const CalendarSearch = () => {
  return (
    <label htmlFor="search-event" className="w-full flex items-center relative">
      <SearchIcon className="text-gray-400 z-10 absolute left-2" />
      <input
        id="#search-event"
        type="text"
        name="search-event"
        style={{ borderWidth: 1 }}
        className="pl-9 pr-4 py-1.5 border-gray-200 rounded-xl w-full text-gray-600 placeholder:text-gray-400 placeholder:font-light placeholder:text-base"
        placeholder="Search by name or day..."
      />
    </label>
  );
};

export default CalendarSearch;
