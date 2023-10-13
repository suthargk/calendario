import React, { useState } from "react";
import TimeClockIcon from "../../../../../assets/icons/TimeClockIcon";
import AttendeeIcon from "../../../../../assets/icons/AttendeeIcon";
import BellIcon from "../../../../../assets/icons/BellIcon";
import OrganizerIcon from "../../../../../assets/icons/OrganizerIcon";
import MeetingLinkIcon from "../../../../../assets/icons/MeetingLinkIcon";
import CopyIcon from "../../../../../assets/icons/CopyIcon";
import MoreIcon from "../../../../../assets/icons/MoreIcon";
import DangerIcon from "../../../../../assets/icons/DangerIcon";
import SpinnerIcon from "../../../../../assets/icons/SpinnerIcon";
import Attendees from "../Attendees";
import EventCardDetailItem from "./EventCardDetailItem";
import { createPortal } from "react-dom";
import AlertOverlay from "../../../../common/AlertOverlay";
import { deleteEvent, fetchEvents } from "../../../../../store/services";

const EventCardDetail = ({
  event,
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
  const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
  const [isAlertOverlayOpen, setIsAlertOverlayOpen] = useState(false);
  const organizerName = organizer.displayName || organizer.email;
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleDeleteEvent = (eventId) => {
    setIsButtonLoading(true);
    deleteEvent({
      setIsLoading: setIsButtonLoading,
      eventId,
    });
  };

  return (
    <div className="relative shadow bg-white rounded-xl p-4 -mx-2 font-light">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsMoreOptionOpen(!isMoreOptionOpen);
        }}
        className={`absolute text-gray-600 right-2.5 top-2.5 p-1 rounded-full hover:bg-gray-100 ${
          isMoreOptionOpen ? "bg-gray-100" : ""
        }`}
      >
        <MoreIcon width={18} height={18} />
      </button>
      {isMoreOptionOpen && (
        <div className="absolute overflow-hidden flex flex-col divide-y bg-white z-10 shadow-xl top-10 right-4 text-sm py-0.5 border border-gray-200 rounded-lg">
          <button
            onClick={() => setIsMoreOptionOpen(false)}
            className="px-3 py-1.5 text-start hover:bg-gray-100"
          >
            Show Event Detail
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsAlertOverlayOpen(true);
              setIsMoreOptionOpen(false);
            }}
            className="px-3 py-1.5 text-start hover:bg-gray-100"
          >
            Delete Event
          </button>
        </div>
      )}
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

      {isMoreOptionOpen &&
        createPortal(
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsMoreOptionOpen(false);
            }}
            className="absolute top-0 left-0 right-0 bottom-0"
          ></div>,
          document.querySelector(".app")
        )}

      {isAlertOverlayOpen &&
        createPortal(
          <AlertOverlay
            title="Event Deletion"
            description="Are you certain you want to delete event? This action is irreversible."
            setIsAlertOverlayOpen={setIsAlertOverlayOpen}
            setIsLoading={setIsButtonLoading}
            icon={
              <DangerIcon width={22} height={22} className="text-red-500" />
            }
            footerAction={
              <div className="flex space-x-2 p-3">
                <button
                  onClick={() => {
                    setIsAlertOverlayOpen(false);
                    setIsButtonLoading(false);
                    setIsMoreOptionOpen(false);
                  }}
                  className="w-full text-sm border border-gray-100 p-1 text-gray-700 rounded-md duration-300 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="relative flex justify-center items-center space-x-1 w-full text-sm border border-red-500 bg-red-500 p-1 text-white rounded-md duration-300 hover:bg-red-400 hover:border-red-400"
                >
                  {isButtonLoading && (
                    <SpinnerIcon
                      width={14}
                      height={14}
                      className="fill-red-500"
                    />
                  )}
                  <span>Delete Event</span>
                </button>
              </div>
            }
          />,
          document.querySelector(".app")
        )}
    </div>
  );
};

export default EventCardDetail;
