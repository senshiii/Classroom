import React from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  useMediaQuery,
  IconButton,
  Button,
} from "@material-ui/core";

import { MenuSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

const DashboardAppBar = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 992px)");
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {isMobile && (
          <IconButton onClick={props.openMenu}>
            <MenuSharp htmlColor="white" />
          </IconButton>
        )}
        &nbsp;
        <Typography variant="h6">Dashboard</Typography>
        <Button
          style={{ color: "white", marginLeft: "auto" }}
          onClick={props.logout}
          size="small"
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
