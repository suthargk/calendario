import React from "react";
import {
  HeadingTextColor,
  bgLinearGradientColor,
  borderColor,
  textColor,
} from "../../../../store/reducers/utils";
import dayjs from "dayjs";

const CalendarHolidayCard = ({ holiday }) => {
  const { summary, start, end, color = "", description } = holiday;

  const startDate = `${dayjs(start.date).format("MMM DD")}`;
  const endDate = `${dayjs(end.date).format("MMM DD")}`;

  return (
    <div
      className={`p-4 block rounded-xl space-y-3 bg-gradient-to-b ${bgLinearGradientColor[color]} border ${borderColor[color]}`}
    >
      <div className="space-y-0.5">
        <h2 className={`text-sm ${HeadingTextColor[color]}`}>
          {summary || "(No title)"}
        </h2>
        <p className={`text-xs uppercase opacity-75 ${textColor[color]}`}>
          {startDate} - {endDate}
        </p>
      </div>
      <div className={`${HeadingTextColor[color]} text-sm`}>
        <span className={`${textColor[color]} text-xs`}>
          Calendario wishes{" "}
        </span>
        <span className="">Happy {summary}!</span>
      </div>
    </div>
  );
};

export default CalendarHolidayCard;
