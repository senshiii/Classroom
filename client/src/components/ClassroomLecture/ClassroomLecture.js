import React, { Fragment } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  Typography,
  Breadcrumbs,
  Box,
  Fab,
  Tooltip,
  makeStyles,
  Button,
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
} from "@material-ui/core";

import {
  AddSharp,
  CloudDownloadSharp,
  GetApp as Download,
  DeleteForeverSharp,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
  outlinedBtn: {
    "&:hover": {
      background: theme.palette.primary.dark,
      color: "white",
      transition: `all ${theme.transitions.duration.short} ${theme.transitions.easing.sharp}`,
    },
  },
  goBack: {
    paddingBottom: 2,
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    cursor: "pointer",
  },
}));

const ClassroomLecture = ({
  lecture,
  goBack,
  showDialog,
  toggleDialog,
  noteTitle,
  setTitle,
  addNote,
  setFile,
  editable,
  delLectureNote,
  cid,
}) => {
  const classes = useStyles();
  return (
    <Box p={2.5}>
      {/* ADD DIALOG */}
      {editable && (
        <Fragment>
          <Tooltip title="Add Note(s)">
            <Fab
              variant="round"
              onClick={toggleDialog}
              className={classes.addFab}
            >
              <AddSharp htmlColor="white" />
            </Fab>
          </Tooltip>
          <Dialog
            open={showDialog}
            onClose={toggleDialog}
            maxWidth="sm"
            fullWidth
          >
            <DialogTitle>Add Lecture</DialogTitle>
            <DialogContent>
              <DialogContentText color="inherit">
                The title suggests what the note is about and is used as the
                file name on download.
              </DialogContentText>
              <TextField
                variant="standard"
                fullWidth
                margin="normal"
                label="Title"
                placeholder="Enter a title for this note"
                value={noteTitle}
                onChange={setTitle}
              />
              <Button fullWidth color="primary">
                <label
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                  htmlFor="note"
                >
                  Select File
                </label>
              </Button>
              <input
                type="file"
                id="note"
                hidden
                onChange={(e) => {
                  // console.log(e.target.files[0]);
                  setFile(e.target.files[0]);
                }}
              />
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button style={{ color: "red" }} onClick={toggleDialog}>
                Cancel
              </Button>
              <Button color="primary" onClick={addNote}>
                Proceed
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
      <Breadcrumbs separator=">">
        <Typography
          variant="body1"
          color="primary"
          className={classes.goBack}
          onClick={goBack}
        >
          Lectures
        </Typography>
        <Typography variant="body1" color="primary">
          Lecture #1
        </Typography>
      </Breadcrumbs>
      <Box
        my={2.5}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Typography variant="h4" style={{ flexGrow: 1 }}>
          {lecture.topic}
        </Typography>
        {/* <Button
          variant="outlined"
          className={classes.outlinedBtn}
          color="primary" 
        >
          <CloudDownloadSharp />
          &nbsp; Download All Notes
        </Button> */}
      </Box>
      <Divider style={{ width: "80%", margin: "0 auto" }} />
      <Typography variant="h5" color="primary" style={{ margin: "1rem 0" }}>
        Notes
      </Typography>
      {lecture.notes.length > 0 ? (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Note Title</TableCell>
                <TableCell align="right">Added on</TableCell>
                <TableCell align="right">Download</TableCell>
                {editable && <TableCell align="right">Delete</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {lecture.notes.map((note) => (
                <TableRow key={note._id}>
                  <TableCell>{note.title}</TableCell>
                  <TableCell align="right">{note.date}</TableCell>
                  <TableCell align="right">
                    <IconButton color="primary">
                      <a style={{ color: "inherit" }} href={note.url} download>
                        <Download />
                      </a>
                    </IconButton>
                  </TableCell>
                  {editable && (
                    <TableCell align="right">
                      <IconButton
                        onClick={() =>
                          delLectureNote(cid, lecture._id, note._id)
                        }
                      >
                        <DeleteForeverSharp style={{ color: "red" }} />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="h4" color="primary">
          No Notes found!!
        </Typography>
      )}
    </Box>
  );
};

export default ClassroomLecture;
