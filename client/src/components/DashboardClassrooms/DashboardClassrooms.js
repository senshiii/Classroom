import React, { Fragment } from "react";

import {
  Box,
  Typography,
  makeStyles,
  Button,
  Divider,
  Chip,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  classbar: {
    width: "100%",
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // background: "white",
    // boxShadow: '0 0 6px -4px #000',
  },
  leaveBtn: {
    color: theme.palette.common.white,
    background: theme.palette.error.main,
    marginLeft: "auto",
    "&:hover": {
      background: theme.palette.error.dark,
    },
  },
}));

const DashboardClassrooms = (props) => {
  const classes = useStyles();
  return (
    <Box p={2}>
      <Box my={2}>
        {props.studentClassrooms.length > 0 ? (
          <Fragment>
            <Typography variant="h5" color="textPrimary">
              Student Classrooms
            </Typography>

            {props.studentClassrooms.map((classroom) => (
              <Fragment key={classroom._id}>
                <Box className={classes.classbar}>
                  <Typography variant="body1" color="textPrimary">
                    {classroom.code}
                  </Typography>
                  {/* <Typography
                variant="body1"
                color="textPrimary"
                style={{ marginLeft: "auto" }}
                >
                Receive Email Notifications
                <Switch defaultChecked color="primary" />
              </Typography> */}
                  <Button
                    className={classes.leaveBtn}
                    variant="contained"
                    onClick={() =>
                      props.leaveClassroomStudent(classroom._id, props.token)
                    }
                  >
                    Leave
                  </Button>
                </Box>
                <Divider variant="fullWidth" style={{ margin: "5px 0" }} />
              </Fragment>
            ))}
          </Fragment>
        ) : (
          <Box my={1}>
            <Typography variant="body2" color="primary">
              No Enrolled Classes
            </Typography>
          </Box>
        )}
        <br />
      </Box>
      {props.teacherClassrooms.length > 0 ? (
        <Fragment>
          <Typography variant="h5" color="textPrimary">
            Teacher Classrooms
          </Typography>
          {props.teacherClassrooms.map((classroom) => (
            <Fragment key={classroom._id}>
              <Box className={classes.classbar}>
                <Typography
                  variant="body1"
                  color="textPrimary"
                  style={{ fontWeight: "bolder" }}
                >
                  {classroom.code}&nbsp;
                </Typography>
                {classroom.head.id === props.id && (
                  <Chip
                    label="Head"
                    style={{ marginLeft: "10px" }}
                    color="primary"
                  />
                )}
                {/* <Typography
              variant="body1"
              color="textPrimary"
              style={{ marginLeft: "auto" }}
            >
              Email Notifications
              <Switch defaultChecked color="primary" />
            </Typography> */}
                {classroom.head.id === props.id ? (
                  <Tooltip title="Head cannot leave class. Appoint someone else as head to leave.">
                    <span style={{ marginLeft: "auto" }}>
                      <Button
                        disabled
                        className={classes.leaveBtn}
                        variant="contained"
                      >
                        Leave
                      </Button>
                    </span>
                  </Tooltip>
                ) : (
                  <Button
                    className={classes.leaveBtn}
                    variant="contained"
                    onClick={() =>
                      props.leaveClassroomTeacher(classroom._id, props.token)
                    }
                  >
                    Leave
                  </Button>
                )}
              </Box>
              <Divider variant="fullWidth" style={{ margin: "5px 0" }} />
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <Box my={1}>
          <Typography variant="body2" color="primary">
            No classes are being taught by you.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DashboardClassrooms;
