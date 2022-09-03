import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setSuccess } from "../../store/linksReducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SuccessSnackbar() {
  const success = useAppSelector((state) => state.links.success);

  const dispatch = useAppDispatch();

  const handleClose = (event?: React.SyntheticEvent | any, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSuccess(''))
  };

  return (
    <>
      {success && (
        <Snackbar
          open={success !== ""}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            {success}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
