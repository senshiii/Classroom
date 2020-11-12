import React, { Fragment } from "react";
import {
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { VisibilitySharp, VisibilityOffSharp } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";

import SpinnerCircular from "../../components/SpinnerCircular/SpinnerCircular";
import { NavLink } from "react-router-dom";

const RegisterForm = (props) => {
  return (
    <Fragment>
      <Typography variant="h3" color="primary">
        Register
      </Typography>
      {props.error && (
        <Alert severity="error" style={{ margin: "10px 0", width: "100%" }}>
          {props.error}
        </Alert>
      )}
      <br />
      <TextField
        type="name"
        variant="outlined"
        color="primary"
        label="Name"
        placeholder="Enter your name"
        fullWidth
        margin="dense"
        style={{ margin: ".8rem 0" }}
        value={props.name}
        onChange={props.setName}
      />
      <TextField
        type="email"
        variant="outlined"
        color="primary"
        label="Email"
        placeholder="Enter your email"
        fullWidth
        margin="dense"
        style={{ margin: ".8rem 0" }}
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
        style={{ margin: ".8rem 0" }}
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
      <TextField
        type={props.showPass ? "text" : "password"}
        variant="outlined"
        color="primary"
        label="Confirm Password"
        placeholder="Enter your password again"
        error={props.pass.length > 0 && props.pass !== props.confirmPass}
        fullWidth
        margin="dense"
        style={{ margin: ".8rem 0" }}
        value={props.confirmPass}
        onChange={props.setConfirmPass}
        helperText={
          props.pass.length > 0 && props.pass !== props.confirmPass
            ? "Passwords do not match"
            : ""
        }
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
        onClick={props.register}
        variant="contained"
        color="primary"
        style={{ margin: "1rem 0" }}
        size="large"
      >
        Register&nbsp;{props.loading && <SpinnerCircular />}
      </Button>
      <Typography variant="body1" color="primary">
        Have an Account?{" "}
        <NavLink style={{ color: "inherit" }} to="/login">
          Login
        </NavLink>
      </Typography>
    </Fragment>
  );
};

export default RegisterForm;
