import * as types from "../types";

const initState = {
  token: null,
  id: null,
  loading: false,
  error: null,
  isAuth: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        id: action.id,
        isAuth: true,
        loading: false,
      };

    case types.AUTH_FAILED:
      return {
        ...state,
        loading: false,
        isAuth: false,
        error: action.error,
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: "",
        id: "",
      };

    case types.CLEAR_AUTH_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default reducer;
