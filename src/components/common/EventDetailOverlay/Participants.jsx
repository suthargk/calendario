import React from "react";
import Attendee from "../../CalendarEvents/CalendarTabSection/CalendarEventCard/Attendees/Attendee";

const Participants = ({ attendees }) => {
  console.log(attendees);

  return (
    <div className=" space-y-2">
      <h2 className="font-medium text-xs">Participants</h2>
      <div className="-mx-4 flex gap-2 overflow-auto">
        {attendees.map((participant, index) => (
          <div
            className={`border rounded-full flex gap-3 p-0.5 pr-1 items-center ${
              index === 0 ? "ml-4" : ""
            } ${attendees.length - 1 === index ? "mr-4" : ""}`}
          >
            <Attendee user={participant} AttendeeColor={participant.color} />
            <p className="w-max text-sm">
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
