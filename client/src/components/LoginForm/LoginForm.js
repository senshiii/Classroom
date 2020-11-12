import React, { Fragment } from "react";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { NavLink } from "react-router-dom";

import { VisibilitySharp, VisibilityOffSharp } from "@material-ui/icons";

import SpinnerCircular from "../SpinnerCircular/SpinnerCircular";

const LoginForm = (props) => {
  return (
    <Fragment>
      <Typography variant="h4" color="textPrimary">
        Login
      </Typography>
      {props.error && (
        <Alert severity="error" style={{ margin: "10px 0", width: "100%" }}>
          {props.error}
        </Alert>
      )}
      <br />
      <TextField
        type="email"
        variant="outlined"
        color="primary"
        label="Email"
        margin="dense"
        placeholder="Enter your email"
        fullWidth
        value={props.email}
        onChange={props.setEmail}
      />
      <TextField
        type={props.showPass ? "text" : "password"}
        variant="outlined"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        fullWidth
        margin="dense"
        value={props.pass}
        onChange={props.setPass}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={props.toggleShowPass}>
                {props.showPass ? <VisibilityOffSharp /> : <VisibilitySharp />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        disabled={!props.email.length > 0 && !props.pass.length > 0}
        onClick={props.login}
        variant="contained"
        color="primary"
        style={{ margin: "1rem 0" }}
        size="large"
      >
        Login&nbsp;{props.loading && <SpinnerCircular />}
      </Button>
      <Typography variant="body1" color="primary">
        Don't have an Account? Create one{" "}
        <NavLink style={{ color: "inherit" }} to="/register">
          here
        </NavLink>
      </Typography>
    </Fragment>
  );
};

export default LoginForm;
