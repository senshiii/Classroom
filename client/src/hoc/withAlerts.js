import React, { Fragment } from "react";

import ErrorAlert from "../components/ErrorAlert/ErrorAlert";

export default (Wrapper) => (props) => {
  // console.log(props.info);
  let msgView = null;
  if (props.info.info) {
    msgView = (
      <ErrorAlert
        info
        message={props.info.infoMsg}
        open={props.info.info}
        close={() => props.clearInfoMsg()}
      />
    );
  }
  if (props.info.error) {
    msgView = (
      <ErrorAlert
        info={false}
        message={props.info.errorMsg}
        open={props.info.error}
        close={() => props.clearErrorMsg()}
      />
    );
  }
  return (  
    <Fragment>
      {msgView}
      <Wrapper {...props} />
    </Fragment>
  );
};
