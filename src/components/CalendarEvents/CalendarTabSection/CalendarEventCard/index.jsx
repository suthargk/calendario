import dayjs from "dayjs";
import React from "react";
import {
  HeadingTextColor,
  bgColor,
  bgLinearGradientColor,
  borderColor,
  textColor,
} from "../../../../store/reducers/utils";
import Attendees from "./Attendees";
import DownChevronIcon from "../../../../assets/icons/DownChevronIcon";
import EventCardDetail from "./EventCardDetail";

const CalendarEventCard = ({
  event,
  handleEventOpen,
  isEventOpenId,
  index,
}) => {
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
  } = event;
  const startTime = `${dayjs(start.dateTime).format("HH:mm A")}`;
  const endTime = `${dayjs(end.dateTime).format("HH:mm A")}`;

  const eventDescription =
    description.length > 30 ? description.slice(0, 30) + "..." : description;

  return (
    <div
      tabIndex={index}
      onClick={() => handleEventOpen(event.id)}
      className={`p-4 block rounded-xl space-y-4 cursor-pointer  focus:outline-2 focus:outline-blue-500 bg-gradient-to-b ${bgLinearGradientColor[color]} border ${borderColor[color]}`}
    >
      <div className="flex justify-between items-start gap-1">
        <div className="space-y-0.5">
          <h2 className={`text-sm ${HeadingTextColor[color]}`}>
            {summary || "(No title)"}
          </h2>
          {isEventOpenId === event.id ? (
            <p
              className={`text-xs opacity-75 ${textColor[color]}`}
              dangerouslySetInnerHTML={{ __html: eventDescription }}
            />
          ) : (
            <p className={`text-xs opacity-75 ${textColor[color]}`}>
              {startTime} - {endTime} (UTC)
            </p>
          )}
        </div>
        <div
          className={`rounded-full duration-300 ${
            isEventOpenId === event.id
              ? "rotate-180 text-white " + bgColor[color]
              : "rotate-0 bg-white " + textColor[color]
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
          startTime={startTime}
          endTime={endTime}
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
        />
      )}
    </div>
  );
};

export default CalendarEventCard;
