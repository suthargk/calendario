import React, { useState } from "react";
import SettingIcon from "../../assets/icons/SettingIcon";
import FullCalendarIcon from "../../assets/icons/FullCalendarIcon";
import { fetchEventsAPI, fetchHolidayAPI } from "../../store/services/utils";
import { connect } from "react-redux";
import { RESET_CURRENT_TIME } from "../../store/actions";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import Calendar from "../Calendar";
import { createPortal } from "react-dom";
import ToolTip from "../common/ToolTip";
import LogoIcon from "../../assets/logo/LogoIcon";

const CalendarHeader = ({
  currentFullDate,
  setReset,
  reset,
  dispatch,
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
  handleSettingPage,
}) => {
  const { month: currentMonth, year: currentYear } = currentFullDate;
  const [isFullCalendar, setIsFullCalendar] = useState(false);
  const [onFullCalendarMoveOver, setOnFullCalendarMoveOver] = useState(false);
  const [onSettingMouseOver, setOnSettingMouseOver] = useState(false);

  const handleToday = () => {
    setReset(Math.random());
    dispatch({ type: RESET_CURRENT_TIME });

    const todaysMonth = dayjs().month();
    const todaysYear = dayjs().year();
    if (!(currentMonth === todaysMonth && currentYear === todaysYear)) {
      fetchEventsAPI(todaysYear, todaysMonth, setIsEventSectionLoading);
      fetchHolidayAPI(todaysYear, todaysMonth, setIsHolidaySectionLoading);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1 text-gray-700 dark:text-slate-50">
        <LogoIcon className="-rotate-12" width={24} height={24} />

        <h4 className="font-medium">Calendario</h4>
      </div>
      <div className="flex gap-1.5 text-gray-700 dark:text-slate-50">
        <button
          onClick={handleToday}
          style={{ fontSize: "13px" }}
          className="focus:outline-2 dark:border-slate-700 focus:outline-blue-500 border border-gray-150 font-medium px-2 rounded-lg flex justify-center items-center"
        >
          Today
        </button>
        <button
          className={`full-calendar-btn relative p-0.5 duration-300 hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-slate-50 rounded-md hover:text-slate-600 focus:outline-2 focus:outline-blue-500 ${
            isFullCalendar
              ? "bg-gray-100 text-gray-600 dark:text-slate-50 dark:bg-slate-700"
              : ""
          }`}
          onClick={() => {
            setIsFullCalendar((prev) => !prev);
          }}
          onMouseEnter={() => setOnFullCalendarMoveOver(true)}
          onMouseLeave={() => setOnFullCalendarMoveOver(false)}
          onFocus={() => setOnFullCalendarMoveOver(true)}
          onBlur={() => setOnFullCalendarMoveOver(false)}
        >
          <FullCalendarIcon width={24} height={24} />
          {onFullCalendarMoveOver && <ToolTip text="Full calendar" />}

          {isFullCalendar &&
            createPortal(
              <div
                className="absolute top-0 bottom-0 right-0 left-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullCalendar(false);
                }}
              ></div>,
              document.querySelector(".app")
            )}

          <AnimatePresence>
            {isFullCalendar && (
              <motion.div
                onMouseOver={() => setOnFullCalendarMoveOver(false)}
                className="absolute top-0 -right-[31px] z-40 text-black cursor-default"
                initial={{
                  opacity: 0,
                  scale: 0,
                  transformOrigin: "90% 0",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  // transformOrigin: "0 0",
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  transformOrigin: "90% 0%",
                }}
                transition={{
                  type: "spring",
                  velocity: 5,
                  mass: 0.5,
                }}
              >
                <Calendar
                  setReset={setReset}
                  reset={reset}
                  setIsEventSectionLoading={setIsEventSectionLoading}
                  setIsHolidaySectionLoading={setIsHolidaySectionLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button
          onMouseEnter={() => {
            setOnSettingMouseOver(true);
          }}
          onClick={handleSettingPage}
          onMouseLeave={() => setOnSettingMouseOver(false)}
          onFocus={() => setOnSettingMouseOver(true)}
          onBlur={() => setOnSettingMouseOver(false)}
          className="relative p-0.5 duration-300 dark:hover:text-gray-50 dark:hover:bg-gray-700 hover:bg-gray-100 rounded-md hover:text-gray-600 focus:outline-2 focus:outline-blue-500"
        >
          <SettingIcon width={23} height={23} />
          {onSettingMouseOver && <ToolTip direction="right" text="Settings" />}
        </button>
      </div>
    </div>
  );
};

const mapToDispatch = (dispatch) => {
  return { dispatch };
};

const mapStateToProps = (state) => {
  return {
    currentFullDate: state.calendar,
  };
};

export default connect(mapStateToProps, mapToDispatch)(CalendarHeader);
