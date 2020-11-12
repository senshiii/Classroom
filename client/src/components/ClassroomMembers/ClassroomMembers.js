import React from "react";

import {
  Box,
  Avatar,
  Typography,
  makeStyles,
  Tooltip,
  Divider,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tab: {
    background: theme.palette.common.white,
    padding: theme.spacing(3),
    minHeight: "100vh",
    width: "100%",
  },
  section: {
    background: "#fff",
    padding: theme.spacing(1),
    margin: "1rem 0",
  },
  avatarWrapper: {
    margin: ".5rem 0",
    "& *": {
      display: "inline-flex",
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
  },
  wrapper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  header: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
  },
  headSection: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "60%",
    margin: `${theme.spacing(4)}px auto`,
    marginTop: 0,
    background: theme.palette.common.white,
  },
  headText: {
    color: theme.palette.primary.dark,
    margin: theme.spacing(1),
  },
  headAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    backgroundColor: theme.palette.secondary.main,
  },
  memberAvatar: {
    background: theme.palette.secondary.main,
    color: theme.palette.common.white,
    width: theme.spacing(6),
    height: theme.spacing(6),
    alignSelf: 'center'
  },
  headName: {
    fontWeight: theme.typography.fontWeightBold,
    margin: theme.spacing(0.5),
  },
}));

const ClassroomMembers = ({ code, students, faculties, head }) => {
  const classes = useStyles();
  return (
    <Box className={classes.tab}>
      <Typography variant="h4" color="primary" className={classes.header}>
        Members of Classroom: {code}
      </Typography>
      <Box className={classes.wrapper}>
        <Box className={classes.headSection}>
          <Typography variant="h4" className={classes.headText}>
            Head of the Class
          </Typography>
          <Divider variant="middle" flexItem orientation="horizontal" />
          <Avatar className={classes.headAvatar}>
            {head ? head.name[0] : ""}
          </Avatar>
          <Typography className={classes.headName} variant="h5">
            {head ? head.name : ""}
          </Typography>
        </Box>
        <Box className={classes.section}>
          <Typography color="primary" variant="h4">
            Faculties
          </Typography>
          <Box className={classes.avatarWrapper}>
            {faculties.map((fac) => (
              <Tooltip title={fac.name} key={fac._id}>
                {fac.dp.url.length > 0 ? (
                  <Avatar src={fac.dp.url} className={classes.memberAvatar} />
                ) : (
                  <Avatar className={classes.memberAvatar}>
                    {fac.name[0].toUpperCase()}
                  </Avatar>
                )}
              </Tooltip>
            ))}
          </Box>
        </Box>
        <Box className={classes.section}>
          <Typography color="primary" variant="h4">
            Students
          </Typography>
          <Box className={classes.avatarWrapper}>
            {students.map((stud) => (
              <Tooltip title={stud.name} key={stud._id}>
                <Avatar className={classes.memberAvatar}>{stud.name[0]}</Avatar>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassroomMembers;
