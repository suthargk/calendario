import dayjs from "dayjs";
import React, { useState } from "react";
import {
  HeadingTextColor,
  bgColor,
  bgLinearGradientColor,
  colors,
  textColor,
} from "../../../../store/reducers/utils";
import Attendees from "./Attendees";
import DownChevronIcon from "../../../../assets/icons/DownChevronIcon";
import CalendarEventCardDetail from "./CalendarEventCardDetail";

const CalendarEventCard = ({ event }) => {
  const {
    summary,
    hangoutLink = "",
    description = "",
    start,
    end,
    organizer,
    attendees = [],
    conferenceData,
    color,
  } = event;
  const startTime = `${dayjs(start.dateTime).format("HH:mm A")}`;
  const endTime = `${dayjs(end.dateTime).format("HH:mm A")}`;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className={`p-4 block rounded-xl space-y-4 cursor-pointer bg-gradient-to-b ${bgLinearGradientColor[color]}`}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-0.5">
          <h2 className={`text-sm ${HeadingTextColor[color]}`}>{summary}</h2>
          {isOpen ? (
            <p className={`text-xs ${textColor[color]}`}>
              {description.slice(0, 30)}...
            </p>
          ) : (
            <p className={`text-xs ${textColor[color]}`}>
              {startTime} - {endTime} (UTC)
            </p>
          )}
        </div>
        <div
          className={`rounded-full duration-300  ${
            isOpen
              ? "rotate-180 text-white " + bgColor[color]
              : "rotate-0 bg-white " + textColor[color]
          } shadow  p-0.5 flex justify-center items-center `}
        >
          <DownChevronIcon width={18} height={18} />
        </div>
      </div>

      {attendees && !isOpen && (
        <Attendees attendees={attendees} className="shadow" />
      )}

      {isOpen && (
        <CalendarEventCardDetail
          event={event}
          startTime={startTime}
          endTime={endTime}
          attendees={attendees}
          organizer={organizer}
          conferenceData={conferenceData}
          color={color}
        />
      )}
    </div>
  );
};

export default CalendarEventCard;
