import { useEffect, useState } from "react";

import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";

import CalendarApp from "./components";
import Login from "./components/Auth/Login";
import CalendarNetworkPopup from "./components/common/CalendarNetworkPopup";
import Loader from "./components/common/Loader";
import Setting from "./components/Setting";
import { SET_USER_AUTH } from "./store/actions";
import { fetchEvents, fetchHolidays } from "./store/services";

function App({ isUserSignedIn, dispatch }) {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isSettingPageOpen, setIsSettingPageOpen] = useState(false);
  const [isEventSectionLoading, setIsEventSectionLoading] = useState(true);
  const [isHolidaySectionLoading, setIsHolidaySectionLoading] = useState(true);

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

    fetchEvents({ setIsEventSectionLoading });
    fetchHolidays({ setIsHolidaySectionLoading });
    setIsAppLoading(false);
  };

  useEffect(() => {
    getAuth();
  }, [isUserSignedIn]);

  return (
    <div className="app bg-white relative rounded-2xl shadow overflow-hidden h-[600px] p-[13px] w-[350px] dark:bg-slate-900 dark:text-slate-50">
      <CalendarNetworkPopup />

      {isAppLoading ? (
        <Loader />
      ) : isUserSignedIn ? (
        isSettingPageOpen ? (
          <Setting setIsSettingPageOpen={setIsSettingPageOpen} />
        ) : (
          <CalendarApp
            setIsSettingPageOpen={setIsSettingPageOpen}
            isEventSectionLoading={isEventSectionLoading}
            isHolidaySectionLoading={isHolidaySectionLoading}
            setIsHolidaySectionLoading={setIsHolidaySectionLoading}
            setIsEventSectionLoading={setIsEventSectionLoading}
          />
        )
      ) : (
        <Login isUserSignedIn={isUserSignedIn} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isUserSignedIn: state.user.isSignedIn,
  };
};

const mapStateToDispatch = (dispatch) => {
  return { dispatch };
};

export default connect(mapStateToProps, mapStateToDispatch)(App);
