import Calendar from "./components/Calendar";
import { useEffect } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { connect } from "react-redux";
import { SET_USER_AUTH } from "./store/actions";

function App({ dispatch, isUserSignedIn, auth }) {
  console.log(isUserSignedIn);
  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  return (
    <div>
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
    auth: state.user.auth,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
