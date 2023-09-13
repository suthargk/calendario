import React from "react";
import AttendUser from "./AttendUser";

const Attendees = ({ attendees, className, style }) => {
  const attendeesContainerWidth = attendees.length === 1 ? 26 : 20;
  return (
    <div
      style={{
        width: `calc(${attendees.length * attendeesContainerWidth}px)`,
        ...style,
      }}
      className={`flex items-center bg-white rounded-full ${className}`}
    >
      {attendees?.map((user) => {
        return (
          <AttendUser key={user.email} user={user} AttendeeColor={user.color} />
        );
      })}
    </div>
  );
};

export default Attendees;
