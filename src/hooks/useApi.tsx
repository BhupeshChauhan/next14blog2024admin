"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import React, { useState } from "react";

const useApi = (apiFucntion: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [response, setResponse] = useState({});

  const {
    setAlertMessage,
    setSeverity,
    setOpenCustomSnackBar,
    setAnchorOrigin,
    setAutoHideDuration,
  } = useGlobalContext();

  const apiCall = async (values: any = null) => {
    setIsLoading(true);
    try {
      let res: any;
      res = await apiFucntion(values);

      if (res.status === 400) {
        setSeverity("error");
        setAlertMessage(res.message);
        setOpenCustomSnackBar(true);
        setAutoHideDuration(2000);
        setAnchorOrigin({ vertical: "top", horizontal: "center" });
        setIsLoading(false);
        setIsError(true);
        return res;
      }
      if (res.status === 200) {
        setSeverity("success");
        setAlertMessage(res.message);
        setOpenCustomSnackBar(true);
        setAutoHideDuration(2000);
        setAnchorOrigin({ vertical: "top", horizontal: "center" });
        setIsLoading(false);
        setResponse(res);
        return res;
      }
    } catch (error: any) {
      setSeverity("error");
      setAlertMessage(error);
      setOpenCustomSnackBar(true);
      setAutoHideDuration(2000);
      setAnchorOrigin({ vertical: "top", horizontal: "center" });
      setIsLoading(false);
      setIsError(true);
      return error;
    }
  };

  const resetValues = () => {
    setIsLoading(false);
    setIsError(false);
    setResponse([]);
  };

  return {
    isLoading,
    isError,
    response,
    apiCall,
    resetValues,
  };
};

export default useApi;
