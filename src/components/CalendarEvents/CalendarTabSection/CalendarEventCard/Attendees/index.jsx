import React from "react";
import Attendee from "./Attendee";

const Attendees = ({ attendees, className, style }) => {
  const attendeesContainerWidth = 26;
  return (
    <div
      style={{
        width: `calc(${
          attendees.length * attendeesContainerWidth -
          (attendees.length - 1) * 8
        }px)`,
        ...style,
      }}
      className={`flex items-center bg-white rounded-full ${className}`}
    >
      {attendees?.map((user) => {
        return (
          <Attendee
            key={user.email}
            user={user}
            AttendeeColor={user.color}
            status={user.responseStatus}
          />
        );
      })}
    </div>
  );
};

export default Attendees;
