import Calendar from "./components/Calendar";
import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";
import { fetchEvents, fetchHolidays } from "./store/services";
import { useEffect, useState } from "react";
import { SET_USER_AUTH, USER_SELECTED_DATE } from "./store/actions";
import CalendarEvents from "./components/CalendarEvents";
import MinimalisticCalendar from "./components/MinimalisticCalendar";
import dayjs from "dayjs";

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
    const authAndFetch = new Promise((resolve) => {
      resolve(getAuth());
    });
    authAndFetch.then(() => {
      fetchEvents({});
      fetchHolidays({});
    });
  }, []);

  return (
    <div
      style={{ backgroundColor: "#fff", width: "350px" }}
      className="p-4 rounded-2xl shadow"
    >
      {!isAppLoading ? (
        <div className="space-y-4">
          <MinimalisticCalendar />
          <Calendar />
          <CalendarEvents />
          <button
            onClick={() => {
              isUserSignedIn
                ? gapi.auth2?.getAuthInstance().signOut()
                : gapi.auth2?.getAuthInstance().signIn();
            }}
          >
            {isUserSignedIn ? "Google -> Log Out" : "Google -> Log In"}
          </button>
        </div>
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
