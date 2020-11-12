import React from "react";

import {
  Box,
  Typography,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

import ClassroomGrid from "../ClassroomGrid/ClassroomGrid";

const useStyles = makeStyles((theme) => ({
  heading: {
    flexGrow: 1,
    [theme.breakpoints.down("md")]: theme.typography.body1,
  },
}));

const DashboardTeacherClassrooms = (props) => {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        mb={4}
      >
        <Typography className={classes.heading} variant="h5">
          Teaching
        </Typography>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={props.onShowJoinDialog}
        >
          Join
        </Button>
        <Divider orientation="vertical" flexItem style={{ margin: "0 1rem" }} />
        <Button
          variant="contained"
          size="medium"
          color="primary"
          onClick={props.onShowCreateDialog}
        >
          Create
        </Button>
      </Box>
      <ClassroomGrid editable classrooms={props.classrooms} teacher />
      {/* JOIN CLASSROOM DIALOG */}
      <Dialog
        open={props.showJoinDialog}
        maxWidth="sm"
        fullWidth
        onClose={props.onCloseJoinDialog}
      >
        <DialogTitle>Join Classroom</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Each classroom has an unique classroom code and a joining password (
            Set by the head of the classroom ). Enter the classroom code and the
            password below to join the respective class as a teacher.
          </DialogContentText>
          <TextField
            variant="standard"
            color="primary"
            type="text"
            fullWidth
            label="Classroom Code"
            placeholder="Enter the Classroom Code"
            value={props.classroomCode}
            onChange={props.setClassroomCode}
            margin="normal"
          />
          <TextField
            variant="standard"
            color="primary"
            type="text"
            fullWidth
            label="Password"
            placeholder="Enter Password"
            value={props.teacherPassword}
            onChange={props.setTeacherPassword}
            margin="normal"
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
      {/* CREATE CLASSROOM DIALOG */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={props.showCreateDialog}
        onClose={props.onCloseCreateDialog}
      >
        <DialogTitle>Create a Classroom</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            variant="standard"
            fullWidth
            margin="normal"
            label="Name"
            placeholder="Enter the Classroom Name"
            value={props.classroomName}
            onChange={props.setClassroomName}
          />
          <TextField
            type="text"
            multiline
            variant="standard"
            fullWidth
            label="Description"
            placeholder="What is this classroom about?"
            margin="normal"
            value={props.classroomDescription}
            onChange={props.setClassroomDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={props.onCloseCreateDialog}
            style={{ color: "red" }}
          >
            CANCEL
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={props.createClassroom}
          >
            CREATE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DashboardTeacherClassrooms;
