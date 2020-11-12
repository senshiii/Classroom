import React from "react";

import classes from "./FullscreenSpinner.module.css";

const Spinner = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className={classes.skCubeGrid}>
        <div className={[classes.skCube, classes.skCube1].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube2].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube3].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube4].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube5].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube6].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube7].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube8].join(" ")}></div>
        <div className={[classes.skCube, classes.skCube9].join(" ")}></div>
      </div>
      <h3 style={{ marginTop: "3px", color: "black", fontWeight: "bold" }}>
        In a moment...
      </h3>
    </div>
  );
};

export default Spinner;
