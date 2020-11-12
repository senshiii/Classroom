import React from "react";

import { Grid, Box, Typography, Button } from "@material-ui/core";

import ClassroomCard from "../ClassroomCard/ClassroomCard";

import _404 from "../../assets/404_classrooms.svg";

const ClassroomGrid = (props) => {
  let _404msg = null;
  if (props.student) {
    _404msg = (
      <Typography
        variant="h6"
        style={{ margin: "2rem 0", textAlign: "center" }}
      >
        You have not enrolled in any classrooms yet. <br />
        Click on&nbsp;
        <Button variant="outlined" color="primary">
          Join
        </Button>
        &nbsp; to join one.
      </Typography>
    );
  } else if (props.teacher) {
    _404msg = (
      <Typography
        variant="h6"
        style={{ margin: "2rem 0", textAlign: "center" }}
      >
        You have not created or joined as a teacher in any classroom yet. <br />
        Click on&nbsp;
        <Button variant="outlined" color="primary">
          Join
        </Button>
        &nbsp; to join one. Click on&nbsp;
        <Button
          disableElevation
          disableFocusRipple
          disableRipple
          disableTouchRipple
          variant="contained"
          color="primary"
        >
          Create
        </Button>
        &nbsp;to create one.
      </Typography>
    );
  }

  return props.classrooms.length > 0 ? (
    <Grid container spacing={3}>
      {props.classrooms.map((classroom) => (
        <Grid key={classroom._id} item xs={12} md={6} lg={4}>
          <ClassroomCard classroom={classroom} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <img src={_404} alt="NO Classrooms" width="280px" />
      {_404msg}
    </Box>
  );
};

export default ClassroomGrid;
