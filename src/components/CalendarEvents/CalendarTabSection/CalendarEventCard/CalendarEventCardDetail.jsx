import React from "react";
import TimeClockIcon from "../../../../assets/icons/TimeClockIcon";
import AttendeeIcon from "../../../../assets/icons/AttendeeIcon";
import BellIcon from "../../../../assets/icons/BellIcon";
import OrganizerIcon from "../../../../assets/icons/OrganizerIcon";
import MeetingLinkIcon from "../../../../assets/icons/MeetingLinkIcon";
import Attendees from "./Attendees";

const CalendarEventCardDetail = ({
  organizer,
  startTime,
  endTime,
  attendees,
  color,
  conferenceData,
}) => {
  return (
    <div className="bg-white rounded-xl p-4 space-y-3 -mx-2 font-light	">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white p-1 border border-gray-200">
          <TimeClockIcon width={14} height={14} className="text-gray-600" />
        </div>
        <p className="text-sm">
          {startTime} - {endTime} <span className="text-gray-600">(UTC)</span>
        </p>
      </div>

      <div className="flex items-start gap-2">
        <div className="rounded-full bg-white p-1 border border-gray-200">
          <AttendeeIcon width={14} height={14} className="text-gray-600" />
        </div>
        <p className="text-sm space-y-1">
          <span>{attendees.length} attendees</span>{" "}
          <Attendees
            attendees={attendees}
            color={color}
            className="outline outline-1 outline-gray-200 rounded-full"
          />
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white p-1 border border-gray-200">
          <BellIcon width={14} height={14} className="text-gray-600" />
        </div>
        <p className="text-sm">{attendees.length} attendees</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white p-1 border border-gray-200">
          <OrganizerIcon width={14} height={14} className="text-gray-600" />
        </div>
        <p className="text-sm">
          {(organizer.displayName || organizer.email).slice(0, 30) + "..."}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="rounded-full bg-white p-1 border border-gray-200">
          <MeetingLinkIcon width={14} height={14} className="text-gray-600" />
        </div>
        <a
          href={conferenceData?.entryPoints[0].uri}
          className="text-sm"
          target="_blank"
        >
          {conferenceData?.entryPoints[0].label}
        </a>
      </div>
    </div>
  );
};

export default CalendarEventCardDetail;
