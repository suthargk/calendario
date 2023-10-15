import React from "react";
import EventDetailOverlayHeader from "./EventDetailOverlayHeader";
import EventDetailOverlayTimeDuration from "./EventDetailOverlayTimeDuration";
import EventDetailOverlayTitle from "./EventDetailOverlayTitle";
import EventDescription from "./EventDescription";
import Participants from "./Participants";
import JoinByPhone from "./JoinByPhone";

const EventDetailOverlay = ({
  event,
  organizer,
  startTime,
  endTime,
  attendees,
  conferenceData,
  reminders,
  hangoutLink,
  summary,
  description,
}) => {
  console.log(event);
  return (
    <div className="h-full">
      <EventDetailOverlayHeader />
      <div className="p-4 space-y-4 overflow-auto h-full">
        <EventDetailOverlayTitle summary={summary} organizer={organizer} />
        <EventDetailOverlayTimeDuration />
        {description && <EventDescription description={description} />}
        {attendees.length ? <Participants attendees={attendees} /> : null}
        {/* <RepeatOn /> */}
        {hangoutLink ? <JoinByPhone /> : null}
        {hangoutLink ? (
          <a
            className="flex rounded-lg text-sm transition-colors duration-200 hover:bg-zinc-900 text-white px-4 py-1.5 font-normal justify-center bg-black"
            href={hangoutLink}
            onClick={(e) => e.stopPropagation()}
            target="_blank"
          >
            Join Meeting
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default EventDetailOverlay;
