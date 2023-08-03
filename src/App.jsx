import Calendar from "./components/Calendar";

import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";
import { fetchEvents } from "./store/services";
import { useEffect, useState } from "react";
import { store } from "./main";
import { SET_USER_AUTH } from "./store/actions";

function App({ dispatch, isUserSignedIn }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const getAuth = async () => {
    let auth2 = await loadAuth2(
      gapi,
      import.meta.env.VITE_GOOGLE_CLIENT_ID,
      "https://www.googleapis.com/auth/calendar"
    );

    console.log(
      store.dispatch({
        type: SET_USER_AUTH,
        payload: {
          auth2,
        },
      })
    );

    setIsAppLoading(false);
  };

  useEffect(() => {
    getAuth();
    fetchEvents({});
  }, []);

  return (
    <div>
      {!isAppLoading ? (
        <>
          <Calendar />

          <button
            onClick={
              isUserSignedIn
                ? gapi.auth2?.getAuthInstance().signOut
                : gapi.auth2?.getAuthInstance().signIn
            }
          >
            {isUserSignedIn ? "Log Out" : "Log In"}
          </button>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.user.isSignedIn,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
