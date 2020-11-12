import React, { useState } from "react";

import {
  makeStyles,
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Divider,
  InputAdornment,
} from "@material-ui/core";

import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  profile: {
    width: "100%",
    minHeight: "100vh",
    background: theme.palette.common.white,
    margin: theme.spacing(0),
    padding: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
  profileInfoCard: {
    width: "40%",
    margin: theme.spacing(1),
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    background: theme.palette.common.white,
    "& *": {
      margin: "0 8px",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
      margin: theme.spacing(1),
      justifyContent: "center",
      flexDirection: "column",
    },
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    fontSize: theme.spacing(5),
    background: theme.palette.primary.dark,
    color: "white",
  },
  updatePassFields: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  newDp: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    clipPath: "circle()",
  },
  closeAccWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
    background: `#ffd6d9`,
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  closeBtn: {
    background: theme.palette.error.main,
    flexGrow: 1,
    color: "#fff",
    "&:hover": {
      background: theme.palette.error.dark,
    },
  },
  closeDivider: {
    margin: "0 10px",
    [theme.breakpoints.down("md")]: {
      display: "none",
      marginTop: ".8rem",
      width: "100%",
    },
  },
}));

const DashboardProfile = (props) => {
  const classes = useStyles();
  const [showPass, setShowPass] = useState(false);
  let isPasswordsEqual =
    props.newPass.length > 0 && props.newPass !== props.newPassConf;
  let dpUrl = props.profile && props.profile.dp ? props.profile.dp.url : "";
  const profileAvatar =
    dpUrl.length > 0 ? (
      <Avatar className={classes.avatar} src={dpUrl} />
    ) : (
      <Avatar className={classes.avatar}>
        {props.profile.name && props.profile.name[0].toUpperCase()}
      </Avatar>
    );
  return (
    <Box className={classes.profile}>
      <Box className={classes.profileInfoCard}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          {profileAvatar}
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ margin: "10px 0" }}
            onClick={props.openDpDialog}
          >
            Change
          </Button>
        </Box>
        <Divider orientation="vertical" variant="fullWidth" flexItem />
        <Box>
          <Typography
            variant="h4"
            color="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.profile.name}
            {/* <IconButton
              size="small"
              disableFocusRipple
              disableRipple
              disableTouchRipple
              onClick={props.openNameDialog}
            >
              <Edit fontSize="small" />
            </IconButton> */}
          </Typography>
          <Typography variant="body1" color="textPrimary">
            {props.profile.email}
          </Typography>
        </Box>
      </Box>

      {/* Update Dp Dialog */}
      <Dialog
        open={props.showDpDialog}
        onClose={props.closeDpDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Choose a New Profile Picture</DialogTitle>
        <DialogContent
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {props.newDp ? (
            <img
              src={URL.createObjectURL(props.newDp)}
              className={classes.newDp}
              alt="New Dp"
            />
          ) : (
            profileAvatar
          )}
          <Button color="primary" style={{ margin: "10px 0" }}>
            <label htmlFor="image" style={{ width: "100%", height: "100%" }}>
              Choose Dp
            </label>
          </Button>
          <input
            hidden
            id="image"
            accept="image/*"
            type="file"
            onChange={props.setNewDp}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={props.closeDpDialog}>
            Cancel
          </Button>
          <Button onClick={() => props.updateProfilePicture()} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Name Dialog */}
      <Dialog
        open={props.showNameDialog}
        onClose={props.closeNameDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Name</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={props.newName}
            onChange={props.setNewName}
            label="Name"
            placeholder="Enter Name"
            color="primary"
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={props.closeNameDialog}>
            Cancel
          </Button>
          <Button color="primary">Update</Button>
        </DialogActions>
      </Dialog>

      <Box className={classes.updatePassword}>
        <Typography color="textPrimary" variant="h5">
          Update Password
        </Typography>
        <Divider variant="middle" style={{ margin: "1rem 0" }} />
        <Box my={1} className={classes.updatePassFields}>
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            label="Old Password"
            type={showPass ? "text" : "password"}
            placeholder="Enter Old Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={props.oldPass}
            onChange={props.setOldPass}
            style={{ margin: ".5rem 1rem" }}
          />
          <TextField
            variant="outlined"
            label="New Password"
            fullWidth
            margin="dense"
            type={showPass ? "text" : "password"}
            placeholder="Enter New Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={props.newPass}
            onChange={props.setNewPass}
            style={{ margin: ".5rem 1rem" }}
          />
          <TextField
            variant="outlined"
            fullWidth
            margin="dense"
            label="Confirm Password"
            type={showPass ? "text" : "password"}
            placeholder="Confirm New Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPass(!showPass)}>
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={props.newPassConf}
            onChange={props.setNewPassConf}
            error={isPasswordsEqual}
            helperText={isPasswordsEqual ? "Passwords do not match" : ""}
            style={{ margin: ".5rem 1rem" }}
          />
          <Button
            variant="contained"
            fullWidth
            color="primary"
            size="small"
            style={{ height: "100%" }}
            onClick={() => props.updatePassword()}
          >
            Update
          </Button>
        </Box>
      </Box>

      <Typography
        color="textPrimary"
        variant="h5"
        style={{ color: "red", marginTop: "1rem" }}
      >
        Close Account
      </Typography>
      <Divider variant="middle" style={{ margin: ".5rem 0" }} />
      <Box className={classes.closeAccWrapper}>
        <Typography
          variant="body1"
          style={{ color: "red", fontWeight: "bold" }}
        >
          Closing your account will lead to permanent deletion of all your data.
          Access to all classrooms and their respective data will also be lost.
          Proceed with caution.
        </Typography>
        <Divider
          orientation="vertical"
          flexItem
          className={classes.closeDivider}
        />
        <Button onClick={props.openCloseAccDialog} className={classes.closeBtn}>
          Close Account
        </Button>
        {/* DELETE ACCOUNT DIALOG */}
        <Dialog
          open={props.showCloseAccDialog}
          onClose={props.closeCloseAccDialog}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you do wish to close your account enter password below and hit
              Close Account.
            </DialogContentText>
            <TextField
              value={props.delPass}
              onChange={props.setDelPass}
              fullWidth
              style={{ margin: "10px 0" }}
              label="Password"
              type={showPass ? "text" : "password"}
              placeholder="Enter Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPass(!showPass)}>
                      {showPass ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              style={{ color: "red" }}
              onClick={props.closeCloseAccDialog}
            >
              Cancel
            </Button>
            <Button color="primary" onClick={props.closeAccount}>
              Close Account
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DashboardProfile;
