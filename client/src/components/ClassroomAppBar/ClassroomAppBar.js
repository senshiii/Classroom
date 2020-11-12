import React, { Fragment, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  makeStyles,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  Divider,
  Tooltip,
} from "@material-ui/core";
import { InfoSharp, MenuSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    zIndex: theme.zIndex.appBar + 1,
  },
  drawerToggle: {
    margin: `0 ${theme.spacing(2)}`,
  },
  leaveBtn: {
    background: "rgba(255,255,255,.5)",
    color: theme.palette.error.main,
    marginLeft: "auto",
    "&:hover": {
      background: theme.palette.error.main,
      color: "#fff",
    },
  },
}));

const ClassroomAppBar = ({ openMobileMenu, name, desc, code, head }) => {
  const classes = useStyles();
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const isMobile = useMediaQuery("(max-width: 992px");
  return (
    <Fragment>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={() => setShowInfoDialog(false)}
        open={showInfoDialog}
      >
        <DialogTitle>{name}</DialogTitle>
        <DialogContent>
          <DialogContentText color="textPrimary">{desc}</DialogContentText>
          <DialogContentText color="textPrimary">
            Head:&nbsp;{head ? head.name : ""},&nbsp;{head ? head.email : ""}{" "}
          </DialogContentText>
        </DialogContent>
        <Divider variant="middle" style={{ margin: "5px 0" }} />
        <DialogActions>
          <Button color="primary" onClick={() => setShowInfoDialog(false)}>
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.drawerToggle}>
          {isMobile && (
            <IconButton color="inherit" onClick={openMobileMenu}>
              <MenuSharp />
            </IconButton>
          )}
          <Typography variant={isMobile ? "body1" : "h5"} color="initial">
            {name}&nbsp;:&nbsp;{code}
          </Typography>
          <Tooltip title="About Classroom">
            <IconButton
              style={{ marginLeft: "auto" }}
              onClick={() => setShowInfoDialog(true)}
            >
              <InfoSharp style={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default ClassroomAppBar;
