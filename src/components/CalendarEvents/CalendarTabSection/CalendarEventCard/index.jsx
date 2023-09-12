import dayjs from "dayjs";
import React from "react";

const CalendarEventCard = ({ event }) => {
  console.log(event);
  const { summary, hangoutLink = "", description, start, end } = event;
  const startTime = `${dayjs(start.dateTime).hour()}:${String(
    dayjs(start.dateTime).minute()
  ).padStart(2, "0")}`;

  const endTime = `${String(dayjs(encodeURIComponent.dateTime).hour()).padStart(
    2,
    "0"
  )}:${String(dayjs(end.dateTime).minute()).padStart(2, "0")}`;

  return (
    <a href={hangoutLink} target="_blank" className="p-4">
      <h2>{summary}</h2>
      <p className="text-sm">
        {startTime} - {endTime} (UTC)
      </p>
    </a>
  );
};

export default CalendarEventCard;
