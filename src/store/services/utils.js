import dayjs from "dayjs";
import { fetchEvents, fetchHolidays } from ".";

export const fetchEventsAPI = (year, month, setIsLoading = () => {}) => {
  fetchEvents({
    timeMin: dayjs(new Date(year, month)).startOf("month").utc().format(),
    timeMax: dayjs(new Date(year, month)).endOf("month").utc().format(),
    setIsLoading,
  });
};

export const fetchHolidayAPI = (year, month, setIsLoading = () => {}) => {
  fetchHolidays({
    timeMin: dayjs(new Date(year, month)).utc().format(),
    timeMax: dayjs(new Date(year, month)).endOf("month").utc().format(),
    setIsLoading,
  });
};
