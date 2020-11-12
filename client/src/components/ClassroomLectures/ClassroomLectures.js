import React, { Fragment, useState } from "react";
import {
  makeStyles,
  Box,
  Typography,
  Grid,
  TextField,
  Divider,
  Fab,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  IconButton,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { AddSharp, DeleteSharp } from "@material-ui/icons";

import { TAB_LECTURE } from "../../constants";
import _404 from "../../assets/404_lecture.svg";

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    position: "relative",
    display: "inline-block",
    fontFamily: "Ubuntu",
    "&::after": {
      position: "absolute",
      bottom: "0",
      left: "-20px",
      display: "block",
      width: "40px",
      height: "20px",
      backgroundColor: theme.palette.primary.main,
    },
  },
  searchBar: {
    width: "20%",
    "&:active": {
      width: "35%",
    },
  },
  addFab: {
    position: "fixed",
    right: "2rem",
    bottom: "2rem",
    zIndex: theme.zIndex.drawer,
    background: theme.palette.secondary.main,
    "&:hover": {
      background: theme.palette.secondary.dark,
    },
  },
  _404txt: {
    [theme.breakpoints.down("md")]: theme.typography.body2,
  },
  _404img: {
    width: "25%",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
  },
}));

const ClassroomLectures = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [id, setId] = useState("");
  return (
    <Box width="100%" p={3}>
      <Box
        display="flex"
        mb={3}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography
          style={{ flexGrow: 1 }}
          variant={isMobile ? "h5" : "h3"}
          className={classes.tabHeader}
          color="primary"
        >
          Lectures
        </Typography>
        {/* <TextField
          variant="outlined"
          label="Search"
          margin="dense"
          size="small"
          placeholder="Enter Lecture Name"
          color="primary"
          type="search"
          // className={classes.searchBar}
        /> */}
      </Box>
      {props.editable && (
        <Fragment>
          <Fab
            variant="round"
            className={classes.addFab}
            onClick={props.toggleDialog}
          >
            <AddSharp htmlColor="white" />
          </Fab>
          {/* ADD LECTURE DIALOG */}
          <Dialog
            maxWidth="sm"
            fullWidth
            open={props.showDialog}
            onClose={props.toggleShowDialog}
          >
            <DialogContent>
              <Typography variant="h4" color="primary">
                Add Lecture
              </Typography>
              <TextField
                variant="standard"
                label="Topic"
                fullWidth
                placeholder="What is the topic of this Lecture ?"
                value={props.value}
                onChange={props.onChange}
                margin="normal"
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="text"
                style={{ color: "red" }}
                onClick={props.closeDialog}
              >
                Cancel
              </Button>
              <Button variant="text" color="primary" onClick={props.addLecture}>
                Add Lecture
              </Button>
            </DialogActions>
          </Dialog>
          {/* DELETE LECTURE CONFIRM DIALOG */}
          <Dialog
            open={showDelDialog}
            maxWidth="sm"
            fullWidth
            onClose={() => {
              setShowDelDialog(false);
              setId("");
            }}
          >
            <DialogTitle>Are you sure? </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "black" }}>
                Are you sure you want to delete this Lecture. <br />
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: ".8rem",
                  }}
                >
                  NOTE: A LECTURE CANNOT BE DELETED IF IT CONTAINS NOTES. DELETE
                  ALL NOTES FIRST TO DELETE LECTURE
                </span>
              </DialogContentText>
              <Divider variant="middle" />
            </DialogContent>
            <DialogActions>
              <Button
                style={{ color: "red" }}
                onClick={() => {
                  setShowDelDialog(false);
                  setId("");
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  props.deleteLecture(props.cid, id, props.token);
                  setShowDelDialog(false);
                  setId("");
                }}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
      {props.lectures.length > 0 ? (
        <Grid container spacing={3}>
          {props.lectures.map((lecture, index) => (
            <Grid item key={lecture._id} xs={12} lg={3}>
              <Card>
                <CardContent
                  style={{ padding: "1rem", paddingBottom: ".7rem" }}
                >
                  <Box
                    display="flex"
                    justifyContent="flex-start"
                    alignItems="center"
                  >
                    <Typography variant="h5" style={{ color: "#1d1d1d" }}>
                      Lecture #{index + 1}
                    </Typography>
                    {props.editable && (
                      <IconButton
                        onClick={() => {
                          setShowDelDialog(true);
                          setId(lecture._id);
                        }}
                      >
                        <DeleteSharp style={{ color: "red" }} />
                      </IconButton>
                    )}
                  </Box>

                  <Divider style={{ margin: ".5rem 0" }} />
                  <Typography variant="body1" color="inherit">
                    {lecture.topic}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#aaa", margin: "0 .5rem", padding: 0 }}
                  >
                    {lecture.notes ? lecture.notes.length : 0} Notes
                  </Typography>
                  <br />
                  <Button
                    size="small"
                    variant="text"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      props.setLecture(lecture);
                      props.setTab(TAB_LECTURE);
                    }}
                  >
                    View Notes
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          mx={3}
          mt={8}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <img
            src={_404}
            className={classes._404img}
            alt="404: Lectures Not Found"
          />
          <Typography variant="h4" color="primary" className={classes._404txt}>
            No Lectures have been added !!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ClassroomLectures;
