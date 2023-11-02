import React from "react";
import {
  attendeeBgColor,
  generateUserProfile,
  textColor,
} from "../../../../../store/reducers/utils";
import { getAttendeeStatus } from "../../../../../utils";

const Attendee = ({ user, AttendeeColor, status }) => {
  const attendName = user.displayName || user.email;
  const attendTagName = generateUserProfile(attendName);
  return (
    <div
      style={{ fontSize: "11px", width: "26px", height: "26px" }}
      className={`relative flex justify-center items-center border-2 dark:border-slate-700 border-white -mr-2 rounded-full uppercase ${textColor[AttendeeColor].darkest} ${attendeeBgColor[AttendeeColor].light} ${attendeeBgColor[AttendeeColor].darkMode} ${textColor[AttendeeColor].darkMode}`}
    >
      <span>{attendTagName}</span>
      {status && (
        <span className="absolute bottom-0 right-[1px]">
          {getAttendeeStatus(status)}
        </span>
      )}
    </div>
  );
};

export default Attendee;
