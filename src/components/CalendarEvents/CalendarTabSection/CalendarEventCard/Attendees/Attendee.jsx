import React from "react";
import {
  attendeeBgColor,
  generateUserProfile,
  textColor,
} from "../../../../../store/reducers/utils";

const Attendee = ({ user, AttendeeColor }) => {
  const attendName = user.displayName || user.email;
  const attendTagName = generateUserProfile(attendName);
  return (
    <div
      style={{ fontSize: "11px", width: "26px", height: "26px" }}
      className={`flex justify-center items-center border-2 border-white -mr-2 rounded-full uppercase ${textColor[AttendeeColor]} ${attendeeBgColor[AttendeeColor]}`}
    >
      {attendTagName}
    </div>
  );
};

export default Attendee;
