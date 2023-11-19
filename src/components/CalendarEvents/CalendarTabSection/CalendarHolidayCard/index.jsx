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
      className={`p-4 block rounded-xl space-y-3 bg-gradient-to-b ${bgLinearGradientColor[color]} border ${borderColor[color].light}  dark:from-slate-800 dark:to-slate-900 dark:border-slate-700`}
    >
      <div className="space-y-0.5">
        <h2 className={`text-sm ${HeadingTextColor[color]} dark:text-slate-50`}>
          {summary || "(No title)"}
        </h2>
        <p
          className={`text-xs uppercase opacity-75 ${textColor[color].darkest} dark:text-slate-400`}
        >
          {startDate} - {endDate}
        </p>
      </div>
      <div className={`${HeadingTextColor[color]} text-sm`}>
        <span
          className={`${textColor[color].darkest} text-xs dark:text-slate-400`}
        >
          Calendario wishes{" "}
        </span>
        <span className="dark:text-slate-50">Happy {summary}!</span>
      </div>
    </div>
  );
};

export default CalendarHolidayCard;
