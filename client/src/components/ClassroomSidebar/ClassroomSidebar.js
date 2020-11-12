import React, { Fragment } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  ListSubheader,
  useMediaQuery,
  IconButton,
} from "@material-ui/core";
import {
  NotesSharp,
  AnnouncementSharp,
  GroupSharp,
  ChevronLeft as CloseMenu,
  ArrowBackSharp as Back,
  SettingsSharp,
} from "@material-ui/icons";

import * as constants from "../../constants";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: constants.DRAWER_WIDTH,
    zIndex: theme.zIndex.appBar - 1,
    flexShrink: 0,
  },
  drawerPaper: {
    width: constants.DRAWER_WIDTH,
    zIndex: theme.zIndex.appBar - 1,
  },
  mobileMenu: {
    width: "70vw",
  },
  mobileMenuPaper: {
    width: "70vw",
  },
  backLink: {
    color: theme.palette.common.black,
    textDecoration: "none",
  },
}));

const ClassroomSidebar = (props) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const drawerList = (
    <Fragment>
      <List>
        <ListItem button onClick={props.goBackToDashboard} >
          <ListItemIcon>
            <Back />
          </ListItemIcon>
          <ListItemText>Go Back to Dashboard</ListItemText>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Classroom</ListSubheader>}>
        <ListItem
          selected={props.tab === constants.TAB_LECTURES}
          button
          onClick={() => {
            props.setTab(constants.TAB_LECTURES);
            if (isMobile) props.onClose();
          }}
        >
          <ListItemIcon>
            <NotesSharp color="primary" />
          </ListItemIcon>
          <ListItemText>Lectures</ListItemText>
        </ListItem>
        <ListItem
          button
          selected={props.tab === constants.TAB_ASSIGNMENTS}
          onClick={() => {
            props.setTab(constants.TAB_ASSIGNMENTS);
            if (isMobile) props.onClose();
          }}
        >
          <ListItemIcon>
            <AnnouncementSharp color="primary" />
          </ListItemIcon>
          <ListItemText>Announcements</ListItemText>
        </ListItem>
        {!props.isHead && (
          <ListItem
            button
            onClick={() => {
              props.setTab(constants.TAB_MEMBERS);
              if (isMobile) props.onClose();
            }}
            selected={props.tab === constants.TAB_MEMBERS}
          >
            <ListItemIcon>
              <GroupSharp color="primary" />
            </ListItemIcon>
            <ListItemText>Members</ListItemText>
          </ListItem>
        )}
      </List>
      {props.isHead && (
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem
            button
            selected={props.tab === constants.TAB_MANAGE}
            onClick={() => {
              props.setTab(constants.TAB_MANAGE);
              if (isMobile) props.onClose();
            }}
          >
            <ListItemIcon>
              <SettingsSharp color="primary" />
            </ListItemIcon>
            <ListItemText>Manage</ListItemText>
          </ListItem>
        </List>
      )}
    </Fragment>
  );
  return isMobile ? (
    <Drawer
      className={classes.mobileMenu}
      classes={{
        paper: classes.mobileMenuPaper,
      }}
      open={props.showMenu}
      variant="temporary"
      onClose={props.onClose}
    >
      <Toolbar>
        <IconButton onClick={props.onClose} style={{ marginLeft: "auto" }}>
          <CloseMenu />
        </IconButton>
      </Toolbar>
      {drawerList}
    </Drawer>
  ) : (
    <Drawer
      variant="persistent"
      open
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      {drawerList}
    </Drawer>
  );
};

export default ClassroomSidebar;
