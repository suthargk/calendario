import Calendar from "./components/Calendar";
import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";
import { fetchEvents, fetchHolidays } from "./store/services";
import { useEffect, useState } from "react";
import { SET_USER_AUTH } from "./store/actions";
import CalendarEvents from "./components/CalendarEvents";
import MinimalisticCalendar from "./components/MinimalisticCalendar";
import CalendarHeader from "./components/CalendarHeader";
import Login from "./components/Auth/Login";
import Loader from "./components/common/Loader";

function App({ dispatch, isUserSignedIn }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isEventSectionLoading, setIsEventSectionLoading] = useState(true);
  const [isHolidaySectionLoading, setIsHolidaySectionLoading] = useState(true);

  const [reset, setReset] = useState(Math.random());
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
      fetchEvents({ setIsEventSectionLoading });
      fetchHolidays({ setIsHolidaySectionLoading });
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#fff",
        width: "350px",
        padding: "13px",
        height: "600px",
      }}
      className="app relative rounded-2xl shadow overflow-hidden"
    >
      {isAppLoading ? (
        <Loader />
      ) : isUserSignedIn ? (
        <div className="space-y-3">
          <CalendarHeader
            reset={reset}
            setReset={setReset}
            setIsEventSectionLoading={setIsEventSectionLoading}
            setIsHolidaySectionLoading={setIsHolidaySectionLoading}
          />
          <MinimalisticCalendar
            setIsEventSectionLoading={setIsEventSectionLoading}
            setIsHolidaySectionLoading={setIsHolidaySectionLoading}
          />

          <CalendarEvents
            isEventSectionLoading={isEventSectionLoading}
            isHolidaySectionLoading={isHolidaySectionLoading}
          />
        </div>
      ) : (
        <Login isUserSignedIn={isUserSignedIn} />
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
