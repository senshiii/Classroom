import React from "react";
import { connect } from "react-redux";
import { Box, Button, Typography } from "@material-ui/core";

import _404_img from "../../assets/404.svg";

const _404 = (props) => {
  return (
    <Box
      width="100%"
      minHeight="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
      style={{height: '100vh'}}
    >
      <img
        src={_404_img}
        style={{ width: "auto", maxWidth: "40%" }}
        alt="404 Img"
      />
      <Typography variant="h6" style={{margin: '10px 0'}} >OOps!! We don't know what to serve..</Typography>
      {props.isAuth ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.replace("/dashboard")}
        >
          Go to Dashboard
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.history.replace("/")}
        >
          Go to Home
        </Button>
      )}
    </Box>
  );
};

const s2P = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(s2P)(_404);
