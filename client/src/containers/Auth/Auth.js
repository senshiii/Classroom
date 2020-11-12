import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import AuthBanner from "../../assets/auth_banner.jpg";

import actions from "../../store/actions";

import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

import withAlerts from "../../hoc/withAlerts";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100vw",
    height: "100vh",
  },
  imageDiv: {
    width: "50%",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  formWrapper: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 3rem",
    [theme.breakpoints.down("md")]: {
      width: "100%",
      backgroundImage: `url(${AuthBanner})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      padding: 0,
    },
  },
  form: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      background: "rgb(255,255,255)",
      padding: theme.spacing(5),
      borderRadius: 6,
    },
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: 10,
  },
}));

const Auth = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [showPass, setShowPass] = useState(false);
  const {
    isAuth,
    loading,
    register,
    login,
    error,
    showRegister,
    clearError,
  } = props;
  const { replace } = props.history;

  useEffect(() => {
    if (isAuth) {
      replace("/dashboard");
    }
  }, [isAuth, replace]);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setConfirmPass("");
    setName("");
    clearError();
  }, [showRegister, clearError]);

  return (
    <Box className={classes.wrapper}>
      <Box className={classes.formWrapper}>
        <Box className={classes.form}>
          {showRegister ? (
            <RegisterForm
              error={error}
              email={email}
              setEmail={(e) => setEmail(e.target.value)}
              pass={password}
              setPass={(e) => setPassword(e.target.value)}
              name={name}
              setName={(e) => setName(e.target.value)}
              confirmPass={confirmPass}
              setConfirmPass={(e) => setConfirmPass(e.target.value)}
              register={() => register(name, email, password)}
              loading={loading}
              showPass={showPass}
              toggleShowPass={(e) => setShowPass(!showPass)}
            />
          ) : (
            <LoginForm
              error={error}
              email={email}
              setEmail={(e) => setEmail(e.target.value)}
              pass={password}
              setPass={(e) => setPassword(e.target.value)}
              login={() => login(email, password)}
              loading={loading}
              showPass={showPass}
              toggleShowPass={(e) => setShowPass(!showPass)}
            />
          )}
          <NavLink className={classes.link} to="/">
            Back to Home
          </NavLink>
        </Box>
      </Box>
      <Box className={classes.imageDiv}>
        <img src={AuthBanner} alt="Auth Banner" width="100%" height="100%" />
      </Box>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
  error: state.auth.error,
  info: state.info,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(actions.login(email, password)),
  register: (name, email, password) =>
    dispatch(actions.register(name, email, password)),
  clearError: () => dispatch(actions.clearError()),
  clearInfoMsg: () => dispatch(actions.clearInfoMsg()),
  clearErrorMsg: () => dispatch(actions.clearErrorMsg()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlerts(Auth));
