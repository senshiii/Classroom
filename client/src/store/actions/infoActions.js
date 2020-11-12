import * as types from "../types";

export const setInfoMessage = (message) => ({
  type: types.INFO_MSG,
  message,
});

export const clearInfoMsg = () => ({
  type: types.CLEAR_INFO_MSG,
});

export const setErrorMessage = (message) => ({
  type: types.ERROR_MSG,
  message,
});

export const clearErrorMsg = () => ({
  type: types.CLEAR_ERROR_MSG,
});
