import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const AlertContext = createContext();

export const useAlert = () => {
  return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({ message: "", type: "", visible: false });
  const timeoutRef = useRef(null);

  const showAlert = (message, type = "error") => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setAlert({ message, type, visible: true });

    timeoutRef.current = setTimeout(() => {
      setAlert((prevAlert) => ({ ...prevAlert, visible: false }));
      timeoutRef.current = setTimeout(() => {
        setAlert({ message: "", type: "", visible: false });
      }, 300);
    }, 5000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <AlertContext.Provider value={showAlert}>
      {children}
      <div
        className={`fixed top-24 right-10 sm:w-1/3 w-1/2 pt-4 text-center bg-black z-50 transition-opacity duration-300 ${
          alert.visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <p className="text-slate-300 text-lg font-avenger">{alert.message}</p>
        <div
          className={
            `timer p-1 z-50 ` +
            (alert.type === "error" ? `bg-red-600` : `bg-green-400`)
          }
          style={{
            animation: alert.visible ? "timerAnimation 5s linear" : "hidden",
          }}
        ></div>
      </div>
    </AlertContext.Provider>
  );
};
