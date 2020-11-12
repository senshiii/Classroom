import * as types from "../types";
import axios from "../../axios";

const authStart = () => ({
  type: types.AUTH_START,
});

export const authSuccess = (token, id) => {
  localStorage.setItem("_c_token", token);
  localStorage.setItem("_c_id", id);
  return {
    type: types.AUTH_SUCCESS,
    token,
    id,
  };
};

const authFailed = (error) => ({
  type: types.AUTH_FAILED,
  error,
});

export const register = (name, email, password) => (dispatch) => {
  dispatch(authStart());
  axios
    .post("/a/register", { name, email, password })
    .then((res) => {
      // console.log(res.data);
      const { token, id } = res.data;
      // SET LOCAL STORAGE
      dispatch(authSuccess(token, id));
    })
    .catch((err) => {
      // console.log("Error Registering User: ", err);
      dispatch(authFailed(err.response.data.status.message));
    });
};

export const login = (email, password) => (dispatch) => {
  dispatch(authStart());
  axios
    .post("/a/login", { email, password })
    .then((res) => {
      // console.log("Login Result: ", res.data);
      const { token, id } = res.data;
      dispatch(authSuccess(token, id));
    })
    .catch((err) => {
      // console.log("Error during login: ", err, err.response);
      dispatch(authFailed(err.response.data.status.message));
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("_c_token");
  localStorage.removeItem("_c_id");
  dispatch({ type: types.AUTH_LOGOUT });
};

export const clearError = () => ({
  type: types.CLEAR_AUTH_ERROR
})
