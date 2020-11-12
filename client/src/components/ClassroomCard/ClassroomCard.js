import React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Grid,
  makeStyles,
  Button,
  Divider,
} from "@material-ui/core";

import { People, PeopleOutline, Notes, Announcement } from "@material-ui/icons";

import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  info: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "& *": {
      fontWeight: "bold",
    },
  },
  subheader: {
    color: theme.palette.primary.main,
  },
  details: {
    width: "100%",
    height: "100%",
    color: theme.palette.common.white,
    textDecoration: "none",
  },
}));

const ClassroomCard = ({ classroom }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        title={classroom.name}
        subheader={classroom.code}
        style={{ fontWeight: "bold" }}
        classes={{ subheader: classes.subheader }}
      />
      <CardContent style={{ paddingTop: "0" }}>
        <Typography
          variant="body1"
          style={{ fontWeight: "bold", margin: ".5rem 0" }}
        >
          {classroom.description}
        </Typography>
        <Divider style={{ margin: "5px 0" }} variant="middle" />
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={12} lg={6} className={classes.info}>
            <People color="primary" />
            &nbsp;
            <Typography variant="body2">Students: </Typography>
            &nbsp;
            {classroom.students.length}
          </Grid>
          <Grid item xs={12} lg={6} className={classes.info}>
            <PeopleOutline color="primary" />
            &nbsp;
            <Typography variant="body2">Teachers: </Typography>
            &nbsp;
            {classroom.faculties.length}
          </Grid>
          <Grid item xs={12} lg={6} className={classes.info}>
            <Notes color="primary" />
            &nbsp;
            <Typography variant="body2">Lectures: </Typography>
            &nbsp;
            {classroom.lectures.length}
          </Grid>
          <Grid item xs={12} lg={6} className={classes.info}>
            <Announcement color="primary" />
            &nbsp;
            <Typography variant="body2">Announcements: </Typography>
            &nbsp;
            {classroom.announcements.length}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button variant="contained" fullWidth color="primary">
          <NavLink
            to={{
              pathname: `/c/${classroom.code}`,
            }}
            className={classes.details}
          >
            View Details
          </NavLink>
        </Button>
      </CardActions>
    </Card>
  );
};

export default ClassroomCard;
