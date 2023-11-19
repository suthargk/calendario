import React from "react";
import Attendee from "../../CalendarEvents/CalendarTabSection/CalendarEventCard/Attendees/Attendee";

const Participants = ({ attendees, totalAttendeesResponse }) => {
  return (
    <div className=" space-y-2">
      <h2 className="font-medium text-xs">
        <span>Attendees </span>
        <span className="text-gray-500 dark:text-slate-400">
          ({totalAttendeesResponse} confirmed)
        </span>
      </h2>
      <div className="-mx-4 flex gap-2 overflow-auto">
        {attendees.map((participant, index) => (
          <div
            className={`border rounded-full flex gap-3 p-0.5 pr-1 items-center dark:border-slate-700 ${
              index === 0 ? "ml-4" : ""
            } ${attendees.length - 1 === index ? "mr-4" : ""}`}
          >
            <Attendee
              user={participant}
              AttendeeColor={participant.color}
              status={participant.responseStatus}
            />
            <p className="w-max text-sm dark:text-slate-300">
              {participant.displayName
                ? participant.displayName
                : participant.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
