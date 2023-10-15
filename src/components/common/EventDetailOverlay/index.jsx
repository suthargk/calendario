import React from "react";
import EventDetailOverlayHeader from "./EventDetailOverlayHeader";
import EventDetailOverlayTimeDuration from "./EventDetailOverlayTimeDuration";
import EventDetailOverlayTitle from "./EventDetailOverlayTitle";
import EventDescription from "./EventDescription";
import Participants from "./Participants";

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
    <div>
      <EventDetailOverlayHeader />
      <div className="p-4 space-y-4">
        <EventDetailOverlayTitle summary={summary} organizer={organizer} />
        <EventDetailOverlayTimeDuration />
        {description && <EventDescription description={description} />}
        {attendees.length ? <Participants attendees={attendees} /> : null}
        {/* <RepeatOn /> */}
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
