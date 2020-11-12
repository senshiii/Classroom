import React, { Fragment } from "react";

import {
  Drawer,
  makeStyles,
  Toolbar,
  List,
  ListItem,
  ListItemAvatar,
  ListSubheader,
  ListItemText,
  Divider,
  Avatar,
  ListItemIcon,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";

import {
  GroupSharp,
  LocalLibrarySharp,
  AccountBoxSharp,
  SettingsApplicationsSharp,
  ChevronLeftSharp,
} from "@material-ui/icons";

import * as constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: constants.DRAWER_WIDTH,
    zIndex: theme.zIndex.appBar - 1,
    flexShrink: 0,
    // background: '#faffff'
  },
  drawerPaper: {
    width: constants.DRAWER_WIDTH,
    zIndex: theme.zIndex.appBar - 1,
    // background: '#faffff'
  },
  menu: {
    width: "70vw",
    // background: '#faffff'
  },
  menuPaper: {
    width: "70vw",
    // background: '#faffff'
  },
  primaryText: {
    color: theme.palette.primary.main,
  },
  menuAvatar: {
    background: theme.palette.primary.main,
    color: "#fff",
  },
}));

const DashboardSideDrawer = (props) => {
  const classes = useStyles();

  const isMobile = useMediaQuery("(max-width: 992px)");

  const menuList = (
    <Fragment>
      <List
        component="nav"
        subheader={
          <ListSubheader style={{ color: "black" }}>Classrooms</ListSubheader>
        }
      >
        <ListItem
          selected={props.currentTab === constants.TAB_STUDENT_CLASSROOMS}
          button
          onClick={() => {
            props.setTab(constants.TAB_STUDENT_CLASSROOMS);
            props.closeMenu();
          }}
        >
          <ListItemAvatar >
            <Avatar className={classes.menuAvatar} >
              <GroupSharp color="inherit" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Enrolled</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={props.currentTab === constants.TAB_TEACHER_CLASSROOMS}
          onClick={() => {
            props.setTab(constants.TAB_TEACHER_CLASSROOMS);
            props.closeMenu();
          }}
        >
          <ListItemAvatar >
            <Avatar className={classes.menuAvatar} >
              <LocalLibrarySharp color="inherit" />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>Teaching</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List
        subheader={
          <ListSubheader style={{ color: "black" }}>Settings</ListSubheader>
        }
        component="nav"
      >
        <ListItem
          button
          selected={props.currentTab === constants.TAB_SETTINGS_PROFILE}
          onClick={() => {
            props.setTab(constants.TAB_SETTINGS_PROFILE);
            props.closeMenu();
          }}
        >
          <ListItemIcon>
            <AccountBoxSharp color="primary" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={props.currentTab === constants.TAB_SETTINGS_CLASSROOM}
          onClick={() => {
            props.setTab(constants.TAB_SETTINGS_CLASSROOM);
            props.closeMenu();
          }}
        >
          <ListItemIcon>
            <SettingsApplicationsSharp color="primary" />
          </ListItemIcon>
          <ListItemText>Classroom</ListItemText>
        </ListItem>
      </List>
    </Fragment>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      className={classes.menu}
      classes={{ paper: classes.menuPaper }}
      onClose={props.closeMenu}
      open={props.showMenu}
    >
      <Toolbar>
        <IconButton style={{ marginLeft: "auto" }} onClick={props.closeMenu}>
          <ChevronLeftSharp />
        </IconButton>
      </Toolbar>
      {menuList}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      classes={{
        paper: classes.drawer,
      }}
    >
      <Toolbar />
      {menuList}
    </Drawer>
  );
};

export default DashboardSideDrawer;
