import React, { useRef, useState } from "react";
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
import {
  deleteEvent,
  deleteFollowingEvents,
  fetchEvents,
} from "../../../../../store/services";
import EventDetailOverlay from "../../../../common/EventDetailOverlay";
import { motion } from "framer-motion";
import Reminder from "../../../../common/Reminder";
import RadioButton from "../../../../common/RadioButton";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { getUserSelectedDate } from "../../../../../store/selectors";
import {
  getISOReplaceMilliSeconds,
  getNormalizeRecurrenceStatusListInString,
} from "../../../../../utils";

const AlertBody = ({
  handleChange,
  radioButtonValue,
  userSelectedFullDate,
  event,
}) => {
  console.log();
  return (
    <div className="space-y-1.5 self-start pl-4 mb-1">
      <RadioButton
        value={"this_event" === radioButtonValue}
        label="This event"
        id="this_event"
        className="text-sm"
        onChange={() => handleChange("this_event")}
      />
      {userSelectedFullDate !== event.start.dateTime.split("T")[0] ? (
        <RadioButton
          value={"this_and_following_events" === radioButtonValue}
          label="This and following events"
          id="this_and_following_events"
          className="text-sm"
          onChange={() => handleChange("this_and_following_events")}
        />
      ) : null}

      <RadioButton
        value={"all_events" === radioButtonValue}
        label="All events"
        id="all_events"
        className="text-sm"
        onChange={() => handleChange("all_events")}
      />
    </div>
  );
};

const EventCardDetail = ({
  event,
  organizer,
  startTimeFormat,
  endTimeFormat,
  attendees,
  color,
  conferenceData,
  reminders,
  hangoutLink,
  summary,
  location,
  description,
  attachments,
  meetingStatus,
  userSelectedFullDate,
}) => {
  const totalAttendeesResponse = attendees.filter(
    (attendee) => attendee.responseStatus === "accepted"
  ).length;

  const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
  const [isAlertOverlayOpen, setIsAlertOverlayOpen] = useState(false);
  const organizerName = organizer.displayName || organizer.email;
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [isEventDetailOverlayOpen, setIsEventDetailOverlayOpen] =
    useState(false);
  const meetingLinkRef = useRef(null);

  const [radioButtonValue, setRadioButtonValue] = useState("this_event");

  const handleChange = (radioValue) => {
    setRadioButtonValue(radioValue);
  };

  const handleDeleteEvent = (event) => {
    setIsButtonLoading(true);

    const userSelectedDateTime = dayjs(
      `${userSelectedFullDate}T${event.start.dateTime.split("T")[1]}`
    );

    if (radioButtonValue === "this_and_following_events") {
      const userSelectedDateFormat = getISOReplaceMilliSeconds(
        userSelectedDateTime.subtract(1, "day")
      );

      const normalizeRecurrenceStatusInString =
        getNormalizeRecurrenceStatusListInString(event, userSelectedDateFormat);

      deleteFollowingEvents({
        setIsLoading: setIsButtonLoading,
        eventId: event.id,
        recurrenceCondition: [normalizeRecurrenceStatusInString],
      });
    } else {
      const userSelectedDateFormat =
        getISOReplaceMilliSeconds(userSelectedDateTime);

      deleteEvent({
        setIsLoading: setIsButtonLoading,
        eventId: event.id,
        userSelectedDateFormat,
        deleteType: event.recurrence ? radioButtonValue : "",
      }).then(() => {
        fetchEvents();
      });
    }
  };

  const handleMeetingLinkClipboard = (e) => {
    e.stopPropagation();
    const clipboard = navigator.clipboard;
    clipboard.writeText(meetingLinkRef.current.textContent);
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

      <motion.div
        initial={{
          scale: 0,
          opacity: 0,
          display: "none",
          transformOrigin: "right top",
        }}
        animate={
          isMoreOptionOpen
            ? {
                scale: 1,
                opacity: 1,
                display: "flex",
                transformOrigin: "right top",
              }
            : {
                scale: 0,
                opacity: 0,
                transformOrigin: "right top",
                transitionEnd: {
                  display: "none",
                },
              }
        }
        // transition={{ type: "spring", velocity: 100 }}
        className="absolute overflow-hidden flex flex-col divide-y bg-white z-10 shadow-xl top-10 right-4 text-sm py-0.5 border border-gray-200 rounded-lg"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsEventDetailOverlayOpen(true);
            setIsMoreOptionOpen(false);
          }}
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
      </motion.div>

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
            {startTimeFormat.time} - {endTimeFormat.time}{" "}
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

        <Reminder
          reminders={reminders}
          icon={<BellIcon width={14} height={14} className="text-gray-600" />}
        />

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
                <span ref={meetingLinkRef}>
                  {conferenceData?.entryPoints[0].label}
                </span>
                <button
                  className="absolute -top-1 -right-2 p-2 hover:bg-gray-100 rounded-full"
                  onClick={handleMeetingLinkClipboard}
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

      {createPortal(
        <motion.div
          initial={{ left: "100%", display: "none" }}
          animate={
            isEventDetailOverlayOpen
              ? { left: "0%", border: "0", display: "block" }
              : {
                  left: "100%",
                  border: "0",
                  transitionEnd: { display: "none" },
                }
          }
          transition={{ velocity: 2, mass: 0.5 }}
          className="absolute z-40 top-0 bottom-0 right-0 left-0 bg-white w-full border-l"
        >
          <EventDetailOverlay
            event={event}
            startTimeFormat={startTimeFormat}
            endTimeFormat={endTimeFormat}
            attendees={attendees}
            organizer={organizer}
            conferenceData={conferenceData}
            reminders={reminders}
            hangoutLink={hangoutLink}
            summary={summary}
            description={description}
            location={location}
            attachments={attachments}
            setIsEventDetailOverlayOpen={setIsEventDetailOverlayOpen}
            meetingStatus={meetingStatus}
            totalAttendeesResponse={totalAttendeesResponse}
          />
        </motion.div>,
        document.querySelector(".app")
      )}

      {createPortal(
        <motion.div
          initial={{ opacity: 0, scale: 0, display: "none" }}
          animate={
            isAlertOverlayOpen
              ? { opacity: 1, scale: 1, display: "flex" }
              : { opacity: 0, scale: 0, transitionEnd: { display: "none" } }
          }
          onClick={(e) => {
            e.stopPropagation();
            setIsAlertOverlayOpen(false);
            setIsLoading(false);
          }}
          // style={{ background: "rgba(0,0,0,.1)" }}
          className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center"
        >
          <AlertOverlay
            title={{
              title: `Delete recurring event`,
              className: `${
                event.recurrence ? "font-normal self-start pl-4 mb-2" : ""
              } `,
            }}
            description={
              !event.recurrence
                ? `Are you certain you want to delete event? This action is irreversible.`
                : ""
            }
            body={
              event.recurrence ? (
                <AlertBody
                  event={event}
                  handleChange={handleChange}
                  radioButtonValue={radioButtonValue}
                  userSelectedFullDate={userSelectedFullDate}
                />
              ) : null
            }
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
                  onClick={() => handleDeleteEvent(event)}
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
          />
        </motion.div>,
        document.querySelector(".app")
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userSelectedFullDate: getUserSelectedDate(state),
  };
};

export default connect(mapStateToProps, null)(EventCardDetail);
