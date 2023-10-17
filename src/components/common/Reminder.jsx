import React from "react";
import EventCardDetailItem from "../CalendarEvents/CalendarTabSection/CalendarEventCard/EventCardDetail/EventCardDetailItem";

const Reminder = ({ reminders, icon }) => {
  return (
    <div>
      {(reminders.useDefault === false && reminders.overrides) ||
      reminders.useDefault ? (
        <EventCardDetailItem icon={icon}>
          <p className="text-sm">
            {reminders?.overrides
              ? reminders?.overrides?.[0].minutes + " min"
              : "30 min"}{" "}
            <span className="text-gray-600 opacity-85">before</span>
          </p>
        </EventCardDetailItem>
      ) : null}
    </div>
  );
};

export default Reminder;
