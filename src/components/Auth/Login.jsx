import React from "react";

import GoogleIcon from "../../assets/logo/GoogleIcon";
import LogoIcon from "../../assets/logo/LogoIcon";
import { SET_USER_AUTH } from "../../store/actions";
import { fetchEvents, fetchHolidays } from "../../store/services";

const Login = ({
  dispatch,
  setIsEventSectionLoading,
  setIsHolidaySectionLoading,
}) => {
  return (
    <div className="flex justify-center items-center flex-col h-full w-full ">
      <div className="flex items-center gap-2 text-gray-600 -ml-8 dark:text-slate-50">
        <LogoIcon className="-rotate-12" width={35} height={35} />
        <h1 className="text-xl font-medium text-gray-700 dark:text-slate-50">
          Calendario
        </h1>
      </div>
      <p className="font-light text-sm text-gray-600 text-center p-2 dark:text-slate-100">
        Sign in to access your links right from this browser extension!
      </p>

      <div className="mt-4">
        <button
          onClick={() => {
            gapi.auth2
              .getAuthInstance()
              .signIn()
              .then((response) => {
                dispatch({
                  type: SET_USER_AUTH,
                  payload: {
                    isSignedIn: response.isSignedIn(),
                  },
                });

                fetchEvents({ setIsEventSectionLoading });
                fetchHolidays({ setIsHolidaySectionLoading });
              });
          }}
          className="flex items-center gap-2 border border-gray-200 dark:border-slate-700 dark:hover:bg-slate-800 px-4 py-1.5 rounded-lg duration-300 hover:bg-gray-100"
        >
          <GoogleIcon width={20} height={20} />
          <p className="text-sm font-medium text-gray-600 dark:text-slate-50">
            Sign in with Google
          </p>
        </button>
      </div>
    </div>
  );
};

export default Login;
