import moment from "moment";

const INITIAL_STATE = {
  dateObject: moment(),
};

const calendarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default calendarReducer;
