import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext<any>(null);

export function GlobalContextProvider({ children }: any) {
  const [User, setUser] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [openCustomSnackBar, setOpenCustomSnackBar] = useState(false);
  const [autoHideDuration, setAutoHideDuration] = useState(1000);
  const [anchorOrigin, setAnchorOrigin] = useState({
    vertical: "bottom",
    horizontal: "left",
  });
  let storedState = [];
  if (typeof window !== "undefined" && window.localStorage) {
    storedState = localStorage.getItem("userData")
      ? JSON?.parse(localStorage.getItem("userData") || "") || []
      : [];
  }
  const [userData, setUserData] = useState(storedState);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <GlobalContext.Provider
      value={{
        alertMessage,
        setAlertMessage,
        severity,
        setSeverity,
        openCustomSnackBar,
        setOpenCustomSnackBar,
        anchorOrigin,
        setAnchorOrigin,
        autoHideDuration,
        setAutoHideDuration,
        User,
        setUser,
        userData,
        setUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
