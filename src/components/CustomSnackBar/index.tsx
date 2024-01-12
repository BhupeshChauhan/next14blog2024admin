"use client";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

interface props {
  open?: any;
  autoHideDuration?: any;
  handleClose?: any;
  alertMessage?: any;
  severity?: any;
  anchorOrigin?: any;
}
const CustomSnackBar = ({
  open,
  autoHideDuration,
  handleClose,
  alertMessage,
  severity,
  anchorOrigin,
}: props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration ? autoHideDuration : 1000}
      onClose={handleClose}
      anchorOrigin={
        anchorOrigin
          ? anchorOrigin
          : {
              vertical: "bottom",
              horizontal: "left",
            }
      }
    >
      <Alert
        onClose={handleClose}
        severity={severity ? severity : "error"}
        sx={{ width: "100%" }}
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackBar;
