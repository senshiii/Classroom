import React, { useEffect, lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import {
  CssBaseline,
  Container,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

import Home from "./containers/Home/Home";
import Auth from "./containers/Auth/Auth";
import ProtectedRoute from "./hoc/ProtectedRoute";
import _404 from "./containers/404/_404";
import FWS1 from "./components/FullscreenSpinner/FullscreenSpinner";
import FWS2 from "./components/FullscreenSpinner2/FullScreenSpinner";

import withProps from "./hoc/withProps";

import actions from "./store/actions";

// Lazy Loaded Containers
const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));
const Classroom = lazy(() => import("./containers/Classroom/Classroom"));

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#f44336",
      dark: "#c21f13",
      light: "#ff7066",
    },
    primary: {
      main: "#3177d4",
      dark: "#0258c9",
      light: "#61a5ff",
    },
    sectionBackground: "#f0f8ff",
  },
});

const App = (props) => {
  // AUTOLOGIN
  useEffect(() => {
    let id = localStorage.getItem("_c_id");
    let token = localStorage.getItem("_c_token");
    if (id && token) {
      props.autoLogin(token, id);
    }
    //eslint-disable-next-line
  }, []);

  const FullWidthContainer = withStyles({
    root: {
      padding: 0,
      background: "#fff",
    },
  })((props) => <Container {...props} />);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FullWidthContainer
        maxWidth="xl"
        style={{ padding: "0 !important", width: "100vw", minHeight: "100vh" }}
      >
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Auth} />
          <Route
            path="/register"
            component={withProps(Auth, { showRegister: true })}
          />
          <ProtectedRoute
            path="/dashboard"
            render={(routeProps) => (
              <Suspense fallback={<FWS1 />}>
                <Dashboard {...routeProps} />
              </Suspense>
            )}
          />
          <ProtectedRoute
            path="/c/:code"
            exact
            render={(routeProps) => (
              <Suspense fallback={<FWS2 />}>
                <Classroom {...routeProps} />
              </Suspense>
            )}
          />
          <Route path="*" component={_404} />
        </Switch>
      </FullWidthContainer>
    </ThemeProvider>
  );
};

const mapDispatchToProps = (dispatch) => ({
  autoLogin: (token, id) => dispatch(actions.authSuccess(token, id)),
});

export default connect(null, mapDispatchToProps)(App);
