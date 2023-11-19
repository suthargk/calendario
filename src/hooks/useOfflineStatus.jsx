import { useEffect, useState } from "react";

const useOfflineStatus = (value) => {
  const [isOffline, setIsOffline] = useState(value);
  const [isOfflineStatusPopupOpen, setOfflineStatusPopupOpen] = useState(value);

  window.addEventListener("offline", () => {
    setIsOffline(true);
    setOfflineStatusPopupOpen(true);
  });

  window.addEventListener("online", () => {
    setIsOffline(false);

    if (isOffline) {
      setTimeout(() => {
        setOfflineStatusPopupOpen(false);
      }, 2000);
    } else {
      setOfflineStatusPopupOpen(true);
    }
  });

  useEffect(() => {
    setIsOffline(!navigator.onLine);
  }, []);

  return [isOffline, isOfflineStatusPopupOpen, setOfflineStatusPopupOpen];
};

export default useOfflineStatus;
