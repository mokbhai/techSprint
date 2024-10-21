import React, { useEffect, useState } from "react";

const InternetConnectionChecker = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOffline(!navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  // Only render the message if offline
  return (
    <>
      {isOffline && (
        <div className="fixed top-0 left-0 w-full p-4 text-center bg-black z-50">
          <p className="text-white text-lg font-avenger">
            You are offline. Please check your internet connection.
          </p>
        </div>
      )}
      {/* {!isOffline && (
        <div className="fixed top-24 right-10 w-1/3 pt-4 text-center bg-black z-50">
          <p className="text-slate-300 text-lg font-avenger">
            You are offline. Please check your internet connection.
          </p>
          <div className="p-1 bg-green-400 z-50"></div>
        </div>
      )} */}
    </>
  );
};

export default InternetConnectionChecker;
