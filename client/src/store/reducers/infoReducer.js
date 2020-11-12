import * as types from "../types";

const initState = {
  info: false,
  infoMsg: "",
  error: false,
  errorMsg: "",
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.INFO_MSG:
      return {
        ...state,
        info: true,
        infoMsg: action.message,
      };
    case types.ERROR_MSG:
      return {
        ...state,
        error: true,
        errorMsg: action.message,
      };
    case types.CLEAR_INFO_MSG:
      return {
        ...state,
        info: false,
        infoMsg: "",
      };
    case types.CLEAR_ERROR_MSG:
      return {
        ...state,
        error: false,
        errorMsg: "",
      };
    default:
      return state;
  }
};
