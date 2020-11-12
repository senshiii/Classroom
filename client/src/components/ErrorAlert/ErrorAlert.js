import React from "react";

import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const ErrorAlert = ({ open, close, message, info }) => {
  return (
    <Snackbar
    autoHideDuration={3500}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={close}
    >
      <Alert severity={info ? "success" : "error"} onClose={close}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
