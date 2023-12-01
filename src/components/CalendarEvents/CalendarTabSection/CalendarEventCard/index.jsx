import React from "react";

import dayjs from "dayjs";
import { motion } from "framer-motion";

import DownChevronIcon from "../../../../assets/icons/DownChevronIcon";
import {
  bgColor,
  bgLinearGradientColor,
  borderColor,
  HeadingTextColor,
  textColor,
} from "../../../../color";
import Attendees from "./Attendees";
import EventCardDetail from "./EventCardDetail";

const CalendarEventCard = ({ event, handleEventOpen, isEventOpenId }) => {
  const {
    summary,
    hangoutLink = "",
    description = "",
    start,
    end,
    organizer,
    attendees = [],
    color,
    location,
    reminders,
    conferenceData,
    attachments,
    status,
  } = event;
  const startTime = `${dayjs(start.dateTime).format("MMM DD, YYYY_hh:mm A")}`;
  const endTime = `${dayjs(end.dateTime).format("MMM DD, YYYY_hh:mm A")}`;

  const startTimeFormat = {
    fullDate: startTime.split("_")[0],
    time: startTime.split("_")[1],
  };

  const endTimeFormat = {
    fullDate: endTime.split("_")[0],
    time: endTime.split("_")[1],
  };

  const eventDescription =
    description.length > 30 ? description.slice(0, 30) + "..." : description;

  return (
    <motion.button
      onClick={() => handleEventOpen(event.id)}
      className={`w-full text-left p-4 block rounded-xl space-y-4 cursor-pointer  focus:outline-2 focus:outline-blue-500 bg-gradient-to-b ${bgLinearGradientColor[color]} border ${borderColor[color].light} dark:from-slate-800 dark:to-slate-900 dark:border-slate-700`}
    >
      <div className="flex justify-between items-start gap-1">
        <div className="space-y-0.5 overflow-hidden">
          <h2
            title={summary}
            className={`text-sm dark:text-slate-50 ${HeadingTextColor[color]} whitespace-nowrap overflow-hidden text-ellipsis`}
          >
            {summary || "(No title)"}
          </h2>
          {isEventOpenId === event.id ? (
            <p
              className={`text-xs opacity-75  ${textColor[color].darkest} dark:text-slate-400`}
              dangerouslySetInnerHTML={{ __html: eventDescription }}
            />
          ) : (
            <p
              className={`text-xs opacity-75 ${textColor[color].darkest} dark:text-slate-400`}
            >
              {startTimeFormat.time} - {endTimeFormat.time} (UTC)
            </p>
          )}
        </div>
        <div
          className={`rounded-full duration-300 ${
            isEventOpenId === event.id
              ? "rotate-180 text-white dark:bg-slate-700 " + bgColor[color].dark
              : "rotate-0 bg-white dark:bg-slate-700 dark:text-slate-50 " +
                textColor[color].darkest
          } shadow  p-0.5 flex justify-center items-center `}
        >
          <DownChevronIcon width={16} height={16} />
        </div>
      </div>
      {attendees && !(isEventOpenId === event.id) && (
        <Attendees attendees={attendees} className="shadow" />
      )}
      {isEventOpenId === event.id && (
        <EventCardDetail
          event={event}
          startTimeFormat={startTimeFormat}
          endTimeFormat={endTimeFormat}
          attendees={attendees}
          organizer={organizer}
          conferenceData={conferenceData}
          color={color}
          reminders={reminders}
          hangoutLink={hangoutLink}
          summary={summary}
          description={description}
          location={location}
          attachments={attachments}
          meetingStatus={status}
        />
      )}
      {isEventOpenId === event.id && (
        <div className="flex justify-between items-center">
          <span
            className={`text-[13px] ${textColor[color].darkest} dark:text-slate-500`}
          >
            Are you going to attend?
          </span>
          <div className={`flex gap-2  ${textColor[color].dark}`}>
            <button
              className={`border ${borderColor[color].dark} px-3 py-0.5 rounded-2xl text-sm dark:text-slate-500 dark:border-slate-500`}
            >
              No
            </button>
            <button
              className={`border ${borderColor[color].dark} px-3  py-0.5 rounded-2xl text-sm dark:text-slate-500 dark:border-slate-500`}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </motion.button>
  );
};

export default CalendarEventCard;
