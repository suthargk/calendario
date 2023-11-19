import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../../../assets/icons/SearchIcon";
import SortIcon from "../../../assets/icons/SortIcon";
import CommandIcon from "../../../assets/icons/CommandIcon";
import ToolTip from "../../common/ToolTip";
import { motion } from "framer-motion";

const CalendarSearchBar = ({ searchValue, handleChange }) => {
  const [onSortMouseOver, setOnSortMouseOver] = useState(false);
  const [inputSelect, setInputSelect] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.keyCode === 75)) {
        inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <label
      htmlFor="search-event"
      className="w-full flex items-center relative divide-x dark:divide-slate-700"
    >
      <div className="flex items-center w-full">
        <SearchIcon className="text-gray-400 z-10 absolute left-2 dark:bg-slate-800" />
        <input
          id="#search-event"
          type="text"
          name="search-event"
          value={searchValue}
          ref={inputRef}
          onChange={(event) => {
            handleChange(event.target.value);
          }}
          onFocus={() => setInputSelect(false)}
          onBlur={() => setInputSelect(true)}
          style={{ borderWidth: 1, paddingBottom: "5px", paddingTop: "5px" }}
          className="pl-9 pr-10 py-1.5 border-gray-200 dark:border-slate-700 rounded-xl w-full text-gray-600 placeholder:text-gray-400 dark:placeholder:text-slate-400 dark:text-slate-200 placeholder:font-light placeholder:text-sm focus:outline-2 focus:outline-blue-500 dark:bg-slate-800"
          placeholder="Search"
        />
        {
          <motion.span
            onClick={() => inputRef.current.focus()}
            animate={
              inputSelect && !searchValue
                ? { scale: 1, opacity: 1, display: "flex" }
                : { scale: 0, opacity: 0, transitionEnd: { display: "none" } }
            }
            className="flex gap-0.5 items-center justify-center absolute right-11 text-gray-400 cursor-text"
          >
            <span className="bg-gray-100 p-1 rounded dark:bg-slate-700">
              <CommandIcon width={12} height={12} />
            </span>
            <span className="text-[12px] dark:bg-slate-700 flex justify-center items-center text-sm bg-gray-100 p-1 leading-none rounded w-[20px] h-[20px]">
              K
            </span>
          </motion.span>
        }
      </div>

      <button
        className="z-10 w-9 absolute right-0 pl-1 h-full focus:outline-2 focus:outline-blue-500"
        onMouseEnter={() => setOnSortMouseOver(true)}
        onMouseLeave={() => setOnSortMouseOver(false)}
        onFocus={() => setOnSortMouseOver(true)}
        onBlur={() => setOnSortMouseOver(false)}
      >
        <SortIcon className="text-gray-400 " />
        {onSortMouseOver && (
          <ToolTip width="w-8" text="Sort by date" parentDivClass="-right-3" />
        )}
      </button>
    </label>
  );
};

export default CalendarSearchBar;
