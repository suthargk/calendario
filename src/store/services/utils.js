import dayjs from "dayjs";
import { fetchEvents, fetchHolidays } from ".";

export const fetchEventsAPI = (year, month) => {
  fetchEvents({
    timeMin: dayjs(new Date(year, month)).startOf("month").utc().format(),
    timeMax: dayjs(new Date(year, month)).endOf("month").utc().format(),
  });
};

export const fetchHolidayAPI = (year, month) => {
  fetchHolidays({
    timeMin: dayjs(new Date(year, month)).utc().format(),
    timeMax: dayjs(new Date(year, month)).endOf("month").utc().format(),
  });
};
