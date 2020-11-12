import React from "react";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  makeStyles,
  Typography,
  Card,
  CardHeader,
  CardActions,
  Divider,
  DialogActions,
  Tooltip
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  main: {
    background: theme.palette.common.white,
    margin: 0,
    minHeight: "100vh",
    padding: theme.spacing(2),
  },
  section: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    background: theme.palette.common.white,
  },
  memberCard: {
    display: "inline-flex",
    height: "auto",
    flexDirection: "column",
    background: "#f0f8ff",
    margin: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginLeft: 0,
      marginRight: 0,
    },
  },
  memberCardAction: {
    "&:hover": {
      background: theme.palette.primary.dark,
      color: "#fff",
    },
    margin: "10px",
  },
  memberCardActionDelete: {
    background: theme.palette.error.main,
    color: "#fff",
    "&:hover": {
      background: theme.palette.error.dark,
    },
    margin: "10px",
  },
  memberSection: {
    width: "95%",
    margin: "0 auto",
    padding: theme.spacing(3),
    background: "white",
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  memberAvatar: {
    background: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  deleteWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: "#ffd6d9",
    marginRight: "1rem",
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  delDiv: {
    margin: "0 10px",
    marginLeft: "auto",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  delBtn: {
    background: theme.palette.error.main,
    color: "#fff",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: "1.5rem",
      background: theme.palette.error.dark,
      color: "#fff",
    },
  },
}));

const ClassroomManage = (props) => {
  const classes = useStyles();
  return (
    <Box className={classes.main}>
      <br />
      <Box display="flex" justifyContent="flex-start">
        <Tooltip title="The Password of this Classroom will be emailed to you">
          <Button variant="contained" color="primary" size="small" onClick={props.getPass} >
            Send Me Joining Password
          </Button>
        </Tooltip>
      </Box>
      <br />
      <Box className={classes.memberSection}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography
            color="primary"
            variant="h4"
            style={{ background: "white", display: "inline" }}
          >
            Teachers
          </Typography>
        </Box>
        <Divider style={{ margin: "10px 0" }} variant="middle" />
        {/* FACULTIES */}
        <Box>
          {props.faculties.map((faculty) => (
            <Card
              elevation={1}
              key={faculty._id}
              className={classes.memberCard}
            >
              <CardHeader
                avatar={
                  <Avatar className={classes.memberAvatar}>
                    {faculty.name[0]}
                  </Avatar>
                }
                title={faculty.name}
                subheader={faculty.email}
              />
              <CardActions
                disableSpacing
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                {props.headId === faculty._id ? (
                  <Button
                    fullWidth
                    disableFocusRipple
                    disableRipple
                    disableTouchRipple
                    disableElevation
                    color="primary"
                    variant="contained"
                    className={classes.memberCardAction}
                  >
                    HEAD
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.memberCardAction}
                    size="small"
                    onClick={() =>
                      props.upgrade(props.cid, faculty._id, props.token)
                    }
                  >
                    Upgrade to Head
                  </Button>
                )}
                {props.headId !== faculty._id && (
                  <Button
                    size="small"
                    fullWidth
                    variant="contained"
                    className={classes.memberCardActionDelete}
                    onClick={() =>
                      props.removeTeacher(props.cid, faculty._id, props.token)
                    }
                  >
                    Remove
                  </Button>
                )}
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <br />
      {/* STUDENTS */}
      <Box className={classes.memberSection}>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography
            color="primary"
            variant="h4"
            style={{ background: "white", display: "inline" }}
          >
            Students
          </Typography>
        </Box>
        <Divider style={{ margin: "10px 0" }} variant="middle" />
        <Box>
          {props.students.map((student) => (
            <Card
              elevation={1}
              key={student._id}
              className={classes.memberCard}
            >
              <CardHeader
                avatar={
                  <Avatar className={classes.memberAvatar}>
                    {student.name[0]}
                  </Avatar>
                }
                title={student.name}
                subheader={student.email}
              />
              <CardActions
                disableSpacing
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Button
                  size="small"
                  fullWidth
                  variant="contained"
                  className={classes.memberCardActionDelete}
                  onClick={() =>
                    props.removeStudent(props.cid, student._id, props.token)
                  }
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
      <Box className={classes.deleteWrapper}>
        <Typography variant="h5" style={{ color: "red" }}>
          Delete Classroom
        </Typography>
        <Divider orientation="vertical" flexItem className={classes.delDiv} />
        <Button onClick={props.openDelDialog} className={classes.delBtn}>
          Delete Classroom
        </Button>
      </Box>
      {/* DELETE CLASSROOM DIALOG */}
      <Dialog
        open={props.showDelDialog}
        onClose={props.closeDelDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ color: "red" }}>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">
            If you want to delete this classroom, enter the password below and
            click Proceed.
          </DialogContentText>
          <DialogContentText style={{ color: "red", fontWeight: "bold" }}>
            NOTE: YOU CAN DELETE THIS CLASSROOM ONLY IF IT HAS 0 LECTURES AND 0
            MEMBERS(EXCLUDING HEAD)
          </DialogContentText>
          <TextField
            variant="standard"
            label="Classroom Password"
            fullWidth
            placeholder="Enter Classroom Password"
            value={props.delPass}
            onChange={props.setDelPass}
            style={{ margin: "10px 0" }}
          />
          <Divider style={{ margin: "10px 0" }} variant="middle" />
          <DialogActions>
            <Button style={{ color: "red" }} onClick={props.closeDelDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={props.delClass}>
              Proceed
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ClassroomManage;
