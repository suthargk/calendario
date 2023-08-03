import axios from "axios";
import { store } from "../../main";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ADD_EVENTS } from "../actions";

dayjs.extend(utc);

export const fetchEvents = ({
  timeMin = dayjs().startOf("month").utc().format(),
  timeMax = dayjs().endOf("month").utc().format(),
}) => {
  const access_token = store.getState().user.access_token;
  return axios
    .get("https://www.googleapis.com/calendar/v3/calendars/primary/events/", {
      headers: { Authorization: `Bearer ${access_token}` },
      params: { timeMin, timeMax, orderBy: "startTime", singleEvents: true },
    })
    .then((res) =>
      store.dispatch({
        type: ADD_EVENTS,
        payload: res.data,
      })
    );
};
