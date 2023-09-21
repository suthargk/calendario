import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ADD_EVENTS, ADD_HOLIDAYS } from "../actions";
import store from "../reducers";

dayjs.extend(utc);

export const fetchEvents = ({
  timeMin = dayjs().startOf("month").utc().format(),
  timeMax = dayjs().endOf("month").utc().format(),
  setIsLoading,
}) => {
  const access_token = store.getState().user.access_token;
  setIsLoading(true);
  return axios
    .get("https://www.googleapis.com/calendar/v3/calendars/primary/events/", {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { timeMin, timeMax },
    })
    .then((res) =>
      store.dispatch({
        type: ADD_EVENTS,
        payload: res.data,
      })
    )
    .finally(() => {
      setIsLoading(false);
    });
};

export const fetchHolidays = ({
  timeMin = dayjs().startOf("month").utc().format(),
  timeMax = dayjs().endOf("month").utc().format(),
  setIsLoading = () => {},
}) => {
  const access_token = store.getState().user.access_token;

  setIsLoading(true);
  return axios
    .get(
      "https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday@group.v.calendar.google.com/events/",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { timeMin, timeMax },
      }
    )
    .then((res) =>
      store.dispatch({
        type: ADD_HOLIDAYS,
        payload: res.data,
      })
    )
    .finally(() => {
      setIsLoading(false);
    });
};
