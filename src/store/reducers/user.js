import { gapi } from "gapi-script";
import { SET_USER_AUTH } from "../actions";

const INITIAL_USER_DATA = {
  isSignedIn: false,
  access_token: null,
};

const applyUserAuth = (state, action) => {
  const { auth2 } = action.payload;

  return {
    ...state,
    isSignedIn: auth2.isSignedIn.get(),
    access_token: gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().access_token,
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
