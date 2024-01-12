import React from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import CustomSnackBar from "../../components/CustomSnackBar";

const SnackBarComponent = () => {
  const {
    alertMessage,
    severity,
    openCustomSnackBar,
    setOpenCustomSnackBar,
    anchorOrigin,
    autoHideDuration,
  } = useGlobalContext();
  return (
    <CustomSnackBar
      open={openCustomSnackBar}
      handleClose={() => setOpenCustomSnackBar(false)}
      alertMessage={alertMessage}
      severity={severity}
      autoHideDuration={autoHideDuration}
      anchorOrigin={anchorOrigin}
    />
  );
};

export default SnackBarComponent;
