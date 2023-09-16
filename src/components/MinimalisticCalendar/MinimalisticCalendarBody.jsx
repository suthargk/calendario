import React from "react";
import { connect } from "react-redux";
import PrevChevron from "../../assets/icons/PrevChevron";
import NextChevron from "../../assets/icons/NextChevron";
import { WEEKDAYVALUES } from "../../store/reducers/utils";
import { getPrevNextFiveDates } from "./utils";
import { USER_SELECTED_DATE } from "../../store/actions";
import dayjs from "dayjs";

const MinimalisticCalendarBody = ({
  currentDate,
  currentDay,
  currentMonth,
  currentYear,
  dispatch,
  daysInPreviousMonth,
}) => {
  const prevNextFiveDates = getPrevNextFiveDates({
    currentDate,
    currentDay,
    daysInPreviousMonth,
  });

  const handleUserSelectDate = (date) => {
    const selectedDate = dayjs(`${currentYear}-${currentMonth + 1}-${date}`);

    dispatch({
      type: USER_SELECTED_DATE,
      payload: selectedDate,
    });
  };

  return (
    <div className="flex justify-between items-center">
      <button className="p-1.5 rounded-full border border-gray-200 bg-white">
        <PrevChevron width={11} height={11} />
      </button>

      <div className="flex justify-center">
        {prevNextFiveDates.map((date) => {
          return (
            <div
              style={{ width: "52px" }}
              className={`py-2 cursor-pointer  text-center rounded-lg text-sm ${
                currentDate === date.date ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleUserSelectDate(date.date)}
            >
              <div
                className={`${
                  currentDate === date.date ? "text-white" : "text-gray-400"
                }`}
              >
                {WEEKDAYVALUES[date.day]}
              </div>
              <div className="text-lg ">
                {String(date.date).padStart(2, "0")}
              </div>
            </div>
          );
        })}
      </div>

      <button className="p-1.5 rounded-full border border-gray-200 bg-white">
        <NextChevron width={11} height={11} />
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentDate: state.calendar.date,
    currentYear: state.calendar.year,
    currentMonth: state.calendar.month,
    currentDay: state.calendar.day,
    daysInPreviousMonth: state.calendar.daysInPreviousMonth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { dispatch };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MinimalisticCalendarBody);
