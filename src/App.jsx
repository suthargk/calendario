import Calendar from "./components/Calendar";
import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";
import { fetchEvents } from "./store/services";
import { useEffect, useState } from "react";
import { SET_USER_AUTH } from "./store/actions";

function App({ dispatch, isUserSignedIn }) {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const getAuth = async () => {
    let auth2 = await loadAuth2(
      gapi,
      import.meta.env.VITE_GOOGLE_CLIENT_ID,
      "https://www.googleapis.com/auth/calendar"
    );

    dispatch({
      type: SET_USER_AUTH,
      payload: {
        auth2,
      },
    });

    setIsAppLoading(false);
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#EBEBEB", width: "350px" }}
      className="p-4 rounded-xl"
    >
      {!isAppLoading ? (
        <>
          <Calendar />
          <button
            style={{ border: "1px solid black" }}
            onClick={() => {
              if (isUserSignedIn) {
                fetchEvents({});
              }
            }}
          >
            Fetch
          </button>
          <button
            onClick={
              isUserSignedIn
                ? gapi.auth2?.getAuthInstance().signOut
                : gapi.auth2?.getAuthInstance().signIn
            }
          >
            {isUserSignedIn ? "Google -> Log Out" : "Google -> Log In"}
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
