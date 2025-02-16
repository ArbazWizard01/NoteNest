import React, { useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import NoteContext from "./NoteContext";

const PopAlerts = () => {
  const { popAlert, handleClose, popUpdated, popDeleted, noTitle } =
    useContext(NoteContext);
  return (
    <>
      <Snackbar open={popAlert} autoHideDuration={2250} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your Note Has Been Added Successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={popUpdated} autoHideDuration={2250} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your Note Has Been Updated Successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={popDeleted} autoHideDuration={2250} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Your Note Has Been Deleted Successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={noTitle} autoHideDuration={2250} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="warning"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Title is required to Add Note!
        </Alert>
      </Snackbar>
    </>
  );
};

export default PopAlerts;
