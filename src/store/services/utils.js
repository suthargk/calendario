import { fetchEvents, fetchHolidays } from ".";

export const fetchEventsAPI = (year, month) => {
  fetchEvents({
    timeMin: dayjs(`${year}-${month}`).startOf("month").utc().format(),
    timeMax: dayjs(`${year}-${month}`).endOf("month").utc().format(),
  });
};

export const fetchHolidayAPI = (year, month) => {
  fetchHolidays({
    timeMin: dayjs(`${year}-${month}-01`).utc().format(),
    timeMax: dayjs(`${year}-${month}`).endOf("month").utc().format(),
  });
};
