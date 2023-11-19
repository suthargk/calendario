import { gapi } from "gapi-script";

import { SET_USER_AUTH } from "../actions";

const INITIAL_USER_DATA = {
  isSignedIn: false,
  access_token: null,
};

const applyUserAuth = (state, action) => {
  const { isSignedIn } = action.payload;

  return {
    ...state,
    access_token: gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token,
    isSignedIn,
  };
};

const userReducer = (state = INITIAL_USER_DATA, action) => {
  switch (action.type) {
    case SET_USER_AUTH: {
      return applyUserAuth(state, action);
    }
    default:
      return state;
  }
};

export default userReducer;
