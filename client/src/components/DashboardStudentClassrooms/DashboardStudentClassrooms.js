import React from "react";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
} from "@material-ui/core";

import ClassroomGrid from "../ClassroomGrid/ClassroomGrid";

const DashboardStudentClassrooms = (props) => {
  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={4}
      >
        <Typography style={{ flexGrow: 1 }} variant="h5">
          Enrolled
        </Typography>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={props.onShowJoinDialog}
        >
          Join
        </Button>
      </Box>
      <ClassroomGrid classrooms={props.classrooms} student />
      <Dialog
        open={props.showJoinDialog}
        onClose={props.onCloseJoinDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Join Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Every classroom has an unique classroom code. Enter the unique code
            of the classroom you wish to join.
          </DialogContentText>
          <TextField
            variant="standard"
            color="primary"
            fullWidth
            type="text"
            label="Classroom Code"
            placeholder="Enter the Unique Classroom Code"
            value={props.classroomCode}
            onChange={props.setClassroomCode}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            style={{ color: "red" }}
            onClick={props.onCloseJoinDialog}
          >
            CANCEL
          </Button>
          <Button variant="text" color="primary" onClick={props.joinClassroom}>
            JOIN
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardStudentClassrooms;
