import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ADD_EVENTS, ADD_HOLIDAYS } from "../actions";
import store from "../reducers";

dayjs.extend(utc);

export const fetchEvents = ({
  timeMin = dayjs().startOf("month").utc().format(),
  timeMax = dayjs().endOf("month").utc().format(),
  setIsEventSectionLoading,
}) => {
  const access_token = store.getState().user.access_token;
  setIsEventSectionLoading(true);
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
      setIsEventSectionLoading(false);
    });
};

export const fetchHolidays = ({
  timeMin = dayjs().startOf("month").utc().format(),
  timeMax = dayjs().endOf("month").utc().format(),
  setIsHolidaySectionLoading = () => {},
}) => {
  const access_token = store.getState().user.access_token;

  setIsHolidaySectionLoading(true);
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
      setIsHolidaySectionLoading(false);
    });
};

export const deleteEvent = ({ setIsLoading, eventId }) => {
  const access_token = store.getState().user.access_token;
  setIsLoading(true);
  return axios
    .delete(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    )
    .catch((err) => {
      console.log(err);
    })
    .finally(() => setIsLoading(false));
};
