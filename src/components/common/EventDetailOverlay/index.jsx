import React from "react";
import EventDetailOverlayHeader from "./EventDetailOverlayHeader";
import EventDetailOverlayTimeDuration from "./EventDetailOverlayTimeDuration";
import EventDetailOverlayTitle from "./EventDetailOverlayTitle";
import EventDescription from "./EventDescription";
import Participants from "./Participants";
import JoinByPhone from "./JoinByPhone";
import Reminder from "../Reminder";
import Location from "./Location";
import Attachments from "./Attachments";

const EventDetailOverlay = ({
  event,
  organizer,
  startTimeFormat,
  endTimeFormat,
  attendees,
  conferenceData,
  reminders,
  hangoutLink,
  summary,
  description,
  location,
  setIsEventDetailOverlayOpen,
  attachments,
  meetingStatus,
  totalAttendeesResponse,
}) => {
  const joinByPhone = conferenceData?.entryPoints?.find(
    (entry) => entry.entryPointType === "phone"
  );

  console.log(event);
  return (
    <div className="h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
      <EventDetailOverlayHeader
        setIsEventDetailOverlayOpen={setIsEventDetailOverlayOpen}
      />
      <div className="p-4 space-y-4 overflow-auto h-full">
        <EventDetailOverlayTitle
          summary={summary}
          organizer={organizer}
          meetingStatus={meetingStatus}
        />
        <EventDetailOverlayTimeDuration
          startTimeFormat={startTimeFormat}
          endTimeFormat={endTimeFormat}
        />
        {description && <EventDescription description={description} />}
        {attendees?.length ? (
          <Participants
            attendees={attendees}
            totalAttendeesResponse={totalAttendeesResponse}
          />
        ) : null}
        {/* <RepeatOn /> */}
        {/* <div>
          <h2 className="font-medium text-xs">Reminder</h2>
          <Reminder reminders={reminders} />
        </div> */}
        {attachments?.length ? <Attachments attachments={attachments} /> : null}
        {joinByPhone && <JoinByPhone joinByPhone={joinByPhone} />}
        {location && <Location location={location} />}
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
