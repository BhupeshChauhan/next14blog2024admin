import React, { createContext, useContext, useState } from "react";

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
