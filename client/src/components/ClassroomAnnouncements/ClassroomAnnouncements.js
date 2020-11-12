import React, { Fragment, useState } from "react";

import {
  Box,
  Typography,
  makeStyles,
  Fab,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Divider,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import { AddSharp, Cancel, CloseSharp } from "@material-ui/icons";

import _404 from "../../assets/404_announcement.svg";

import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    fontFamily: "Ubuntu",
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
  _404img: {
    width: "20%",
    [theme.breakpoints.down("md")]: {
      width: "60%",
    },
  },
}));

const ClassroomAnnouncements = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 992px)");
  const [showDelCongDilaog, setshowDelCongDilaog] = useState(false);
  const [id, setId] = useState("");
  return (
    <Box p={3} width="100%" style={{ background: "#fff", minHeight: "100vh" }}>
      {/* ADD ANNOUNCEMENT DIALOG */}
      {props.editable && (
        <Fragment>
          <Tooltip title="Add an Announcement">
            <Fab
              variant="round"
              onClick={props.toggleDialog}
              className={classes.addFab}
            >
              <AddSharp htmlColor="white" />
            </Fab>
          </Tooltip>
          <Dialog
            open={props.showDialog}
            onClose={null}
            maxWidth="lg"
            fullWidth
          >
            <DialogTitle>Add Announcement</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make an announcement for the students of this class
              </DialogContentText>
              <TextField
                fullWidth
                label="Title"
                placeholder="Enter title of the announcement."
                value={props.title}
                onChange={props.setTitle}
                margin="normal"
              />
              <TextField
                variant="outlined"
                rows="5"
                margin="normal"
                multiline
                value={props.desc}
                onChange={props.setDesc}
                fullWidth
                label="Description"
                placeholder="Enter the content of the Announcement"
              />
              <Typography variant="body1" color="primary">
                Attachments
                <IconButton>
                  <label
                    style={{ width: "100%", height: "100%" }}
                    htmlFor="file"
                  >
                    <AddSharp />
                  </label>
                </IconButton>
              </Typography>
              <input
                id="file"
                type="file"
                hidden
                onChange={props.setAttachments}
              />
              <Box>
                {props.attachments.map((att, index) => (
                  <Box
                    display="inline-flex"
                    p={1}
                    border={1}
                    borderRadius={3}
                    m={1.3}
                  >
                    <Typography variant="body2" style={{ color: "black" }}>
                      {att.name}
                    </Typography>
                    <Cancel
                      style={{ cursor: "pointer" }}
                      onClick={() => props.delAttachment(index)}
                    />
                  </Box>
                ))}
              </Box>
              <Typography
                style={{ marginTop: "1rem" }}
                color="primary"
                variant="body1"
              >
                Links
              </Typography>
              <Box
                display="flex"
                my={1}
                justifyContent="center"
                alignItems="center"
              >
                <TextField
                  color="primary"
                  label="Title"
                  margin="dense"
                  value={props.linkTitle}
                  onChange={props.setLinkTitle}
                  placeholder="Enter title of link"
                  style={{ margin: "0 .5rem", width: "50%" }}
                />
                <TextField
                  color="primary"
                  label="Link"
                  margin="dense"
                  placeholder="Enter link"
                  value={props.link}
                  style={{ margin: "0 .5rem", width: "50%" }}
                  onChange={props.setLink}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.setLinks}
                >
                  <AddSharp />
                </Button>
              </Box>
              <Box my={1}>
                {props.links.map((link, index) => (
                  <Box
                    display="inline-flex"
                    p={1}
                    m={1}
                    borderRadius={3}
                    border={1}
                    alignItems="center"
                  >
                    <Box>
                      <Typography variant="body2">{link.title}</Typography>
                      <Typography variant="caption" style={{ color: "grey" }}>
                        {link.link}
                      </Typography>
                    </Box>
                    <CloseSharp
                      style={{ margin: "0 10px", cursor: "pointer" }}
                      onClick={() => props.delLink(index)}
                    />
                  </Box>
                ))}
              </Box>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button style={{ color: "red" }} onClick={props.cancel}>
                Cancel
              </Button>
              <Button color="primary" onClick={props.addAnnouncement}>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
      <Dialog
        open={showDelCongDilaog}
        onClose={() => setshowDelCongDilaog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Announcement? All associated
            attachments will also be deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "red" }}
            onClick={() => {
              setshowDelCongDilaog(false);
              setId("");
            }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => props.delAnnouncement(props.cid, id, props.token)}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        width="100%"
        display="flex"
        justifyContent="fex-start"
        alignItems="center"
      >
        <Typography
          variant={isMobile ? "h5" : "h3"}
          className={classes.tabHeader}
          color="primary"
        >
          Announcements
        </Typography>
      </Box>
      {props.announcements.length > 0 ? (
        <Box>
          {props.announcements.map((ann) => (
            <AnnouncementCard
              title={ann.title}
              description={ann.description}
              attachments={ann.attachments}
              key={ann._id}
              links={ann.links}
              setId={setId}
              id={ann._id}
              showDialog={() => setshowDelCongDilaog(true)}
              editable={props.editable}
            />
          ))}
        </Box>
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
          <Typography variant="h4" color="primary">
            No Announcements have been added !!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ClassroomAnnouncements;
