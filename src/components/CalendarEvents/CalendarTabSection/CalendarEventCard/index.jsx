import dayjs from "dayjs";
import React from "react";
import {
  HeadingTextColor,
  bgColor,
  bgLinearGradientColor,
  textColor,
} from "../../../../store/reducers/utils";
import Attendees from "./Attendees";
import DownChevronIcon from "../../../../assets/icons/DownChevronIcon";
import EventCardDetail from "./EventCardDetail";

const CalendarEventCard = ({ event, handleEventOpen, isEventOpen }) => {
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
    reminders,
  } = event;
  const startTime = `${dayjs(start.dateTime).format("HH:mm A")}`;
  const endTime = `${dayjs(end.dateTime).format("HH:mm A")}`;

  const eventDescription =
    description.length > 30 ? description.slice(0, 30) + "..." : description;

  return (
    <div
      onClick={() => handleEventOpen(event.id)}
      className={`p-4 block rounded-xl space-y-4 cursor-pointer bg-gradient-to-b ${bgLinearGradientColor[color]}`}
    >
      <div className="flex justify-between items-start gap-1">
        <div className="space-y-0.5">
          <h2 className={`text-sm ${HeadingTextColor[color]}`}>
            {summary || "(No title)"}
          </h2>
          {isEventOpen === event.id ? (
            <p className={`text-xs opacity-75 ${textColor[color]}`}>
              {eventDescription}
            </p>
          ) : (
            <p className={`text-xs opacity-75 ${textColor[color]}`}>
              {startTime} - {endTime} (UTC)
            </p>
          )}
        </div>
        <div
          className={`rounded-full duration-300 ${
            isEventOpen === event.id
              ? "rotate-180 text-white " + bgColor[color]
              : "rotate-0 bg-white " + textColor[color]
          } shadow  p-0.5 flex justify-center items-center `}
        >
          <DownChevronIcon width={16} height={16} />
        </div>
      </div>

      {attendees && !(isEventOpen === event.id) && (
        <Attendees attendees={attendees} className="shadow" />
      )}

      {isEventOpen === event.id && (
        <EventCardDetail
          event={event}
          startTime={startTime}
          endTime={endTime}
          attendees={attendees}
          organizer={organizer}
          conferenceData={conferenceData}
          color={color}
          reminders={reminders}
          hangoutLink={hangoutLink}
        />
      )}
    </div>
  );
};

export default CalendarEventCard;
