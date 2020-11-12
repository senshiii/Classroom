import React from "react";
import classes from "./FullscreenSpinner.module.css";

const wrapperStyles = {
  width: "100vw",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "white",
  flexDirection: "column",
  zIndex: 10000,
};

const msgStyles = {
  fontFamily: "Ubuntu",
  fontSize: "1rem",
  leterSpacing: 4,
};

const FullScreenSpinner = () => {
  return (
    <div style={wrapperStyles}>
      <div className={classes.skFoldingCube}>
        <div className={[classes.skCube1, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube2, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube4, classes.skCube].join(" ")}></div>
        <div className={[classes.skCube3, classes.skCube].join(" ")}></div>
      </div>
      <br />
      <h3 style={msgStyles}>Just a Sec....</h3>
    </div>
  );
};

export default FullScreenSpinner;
