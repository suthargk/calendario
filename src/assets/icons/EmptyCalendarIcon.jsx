import React from "react";

const EmptyCalendarIcon = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24"
      viewBox="0 0 24 24"
      id="calendar"
      {...rest}
    >
      <path
        fill="rgb(243 244 246)"
        d="M7 6a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1H7zm10 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v2a1 1 0 0 1-.999 1H17z"
      />
      <path
        fill="rgb(209 213 219)"
        d="M19 4h-1v1a1 1 0 0 1-2 0V4H8v1a1 1 0 0 1-2 0V4H5a3 3 0 0 0-3 3v2h20V7a3 3 0 0 0-3-3z"
      />
      <circle cx="7" cy="13" r="1" fill="rgb(209 213 219)" />
      <circle cx="7" cy="17" r="1" fill="rgb(209 213 219)" />
      <circle cx="12" cy="13" r="1" fill="rgb(209 213 219)" />
      <circle cx="12" cy="17" r="1" fill="rgb(209 213 219)" />
      <circle cx="17" cy="13" r="1" fill="rgb(209 213 219)" />
      <circle cx="17" cy="17" r="1" fill="rgb(209 213 219)" />
      <path
        fill="rgb(243 244 246)"
        d="M2 9v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V9H2zm5 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm0-4a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
      />
    </svg>
  );
};

export default EmptyCalendarIcon;
