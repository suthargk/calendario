import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import CheckedRoundedIcon from "../../assets/icons/CheckedRoundedIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import WarningIcon from "../../assets/icons/WarningIcon";
import useOfflineStatus from "../../hooks/useOfflineStatus";

const CalendarNetworkPopup = () => {
  const [isAppOffline, isOfflineStatusPopupOpen, setIsOfflineStatusPopupOpen] =
    useOfflineStatus(false);
  return (
    <AnimatePresence>
      {isOfflineStatusPopupOpen && (
        <motion.div
          initial={{ top: "-100%" }}
          animate={{ top: "2%" }}
          exit={{ top: "-100%" }}
          transition={{
            type: "spring",
            velocity: 5,
            mass: 0.4,
          }}
          className="w-4/5 border border-gray-100 flex left-1/2 -translate-x-1/2 gap-1 absolute bg-white z-50 drop-shadow-2xl p-2 rounded-xl"
        >
          {isAppOffline ? (
            <WarningIcon className="text-orange-500" width={16} height={16} />
          ) : (
            <CheckedRoundedIcon
              width={16}
              height={16}
              className="text-green-500 "
            />
          )}
          <div>
            <h6 className="text-xs  mb-0.5 text-black">
              {isAppOffline ? "No internet" : "Online"}
            </h6>
            <p className="text-[10px] text-gray-500">
              {isAppOffline
                ? "Check your internet connection"
                : "You're online now"}
            </p>
          </div>
          <CloseIcon
            onClick={() => setIsOfflineStatusPopupOpen(false)}
            className="absolute top-2 cursor-pointer right-2 text-gray-500"
            width={12}
            height={12}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CalendarNetworkPopup;
