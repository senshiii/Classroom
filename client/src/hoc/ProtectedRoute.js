import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = (props) => {
  if(!props.isAuth){
    return <Redirect to="/login" />
  }
  return <Route {...props} />;
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(ProtectedRoute);
