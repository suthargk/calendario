import React from "react";
import TimeClockIcon from "../../../../../assets/icons/TimeClockIcon";
import AttendeeIcon from "../../../../../assets/icons/AttendeeIcon";
import BellIcon from "../../../../../assets/icons/BellIcon";
import OrganizerIcon from "../../../../../assets/icons/OrganizerIcon";
import MeetingLinkIcon from "../../../../../assets/icons/MeetingLinkIcon";
import CopyIcon from "../../../../../assets/icons/CopyIcon";
import Attendees from "../Attendees";
import EventCardDetailItem from "./EventCardDetailItem";

const EventCardDetail = ({
  organizer,
  startTime,
  endTime,
  attendees,
  color,
  conferenceData,
  reminders,
  hangoutLink,
}) => {
  const totalAttendeesResponse = attendees.filter(
    (attendee) => attendee.responseStatus === "accepted"
  ).length;

  const organizerName = organizer.displayName || organizer.email;

  return (
    <div className="shadow bg-white rounded-xl p-4 -mx-2 font-light">
      <div
        className={`space-y-3  ${
          hangoutLink ? "mb-4 pb-4 border-b border-gray-200" : ""
        }`}
      >
        <EventCardDetailItem
          icon={
            <TimeClockIcon width={14} height={14} className="text-gray-600" />
          }
        >
          <p className="text-sm">
            {startTime} - {endTime}{" "}
            <span className="text-gray-600 opacity-85">(UTC)</span>
          </p>
        </EventCardDetailItem>

        {attendees.length ? (
          <EventCardDetailItem
            icon={
              <AttendeeIcon width={14} height={14} className="text-gray-600" />
            }
          >
            <p className="text-sm space-y-1">
              <span>
                {attendees.length} attendee{" "}
                <span className="text-gray-600 opacity-85">
                  ({totalAttendeesResponse} confirmed)
                </span>
              </span>{" "}
              <Attendees
                attendees={attendees}
                color={color}
                className="outline outline-1 outline-gray-200 rounded-full"
              />
            </p>
          </EventCardDetailItem>
        ) : null}

        {(reminders.useDefault === false && reminders.overrides) ||
        reminders.useDefault ? (
          <EventCardDetailItem
            icon={<BellIcon width={14} height={14} className="text-gray-600" />}
          >
            <p className="text-sm">
              {reminders?.overrides
                ? reminders?.overrides?.[0].minutes + " min"
                : "30 min"}{" "}
              <span className="text-gray-600 opacity-85">before</span>
            </p>
          </EventCardDetailItem>
        ) : null}

        <EventCardDetailItem
          icon={
            <OrganizerIcon width={14} height={14} className="text-gray-600" />
          }
        >
          <p className="text-sm">
            {organizerName.length > 30
              ? organizerName.slice(0, 30) + "..."
              : organizerName}
          </p>
        </EventCardDetailItem>

        {hangoutLink ? (
          <EventCardDetailItem
            icon={
              <MeetingLinkIcon
                width={14}
                height={14}
                className="text-gray-600"
              />
            }
          >
            <p className=" text-sm space-y-1 grow">
              <span>Google Meet</span>

              <p className="relative text-sm text-gray-600 opacity-85">
                <span>{conferenceData?.entryPoints[0].label}</span>
                <button
                  className="absolute -top-1 -right-2 p-2 hover:bg-gray-100 rounded-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <CopyIcon height={14} width={14} className="text-gray-600" />
                </button>
              </p>
            </p>
          </EventCardDetailItem>
        ) : null}
      </div>

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
  );
};

export default EventCardDetail;
