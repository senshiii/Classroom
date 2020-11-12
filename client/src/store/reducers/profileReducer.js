import * as types from "../types";

const initState = {
  name: null,
  email: null,
  dp: null,
  studentClassrooms: [],
  teacherClassrooms: [],
  loading: false,
  operationLoad: false,
  operationError: null,
  error: null,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    
    case types.LOAD_PROFILE:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.SET_PROFILE:
      return {
        ...state,
        loading: false,
        ...action.profile,
      };

    case types.LOAD_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.CREATE_CLASSROOM:
      return {
        ...state,
        ...action.profile,
      };

    case types.PROFILE_OPERATION_LOAD_START:
      return {
        ...state,
        operationLoad: true,
      };

    case types.PROFILE_OPERATION_LOAD_STOP:
      return {
        ...state,
        operationLoad: false,
      };

    case types.CLEAR_PROFILE_OPERATION_ERROR:
      return {
        ...state,
        operationError: null,
      };

    case types.PROFILE_OPERATION_ERROR:
      return {
        ...state,
        operationError: action.error,
      };

    case types.JOIN_CLASSROOM_STUDENT:
      return {
        ...state,
        ...action.profile,
      };

    case types.JOIN_CLASSROOM_TEACHER:
      return {
        ...state,
        ...action.profile,
      };

    case types.UPDATE_PROFILE_PICTURE:
      return {
        ...state,
        dp: action.dp,
      };

    case types.LEAVE_CLASSROOM:
      return {
        ...state,
        ...action.profile,
      };

    case types.CLOSE_ACCOUNT:
      return {
        ...state,
        name: null,
        email: null,
        dp: null,
        studentClassrooms: [],
        teacherClassrooms: [],
        loading: false,
        operationLoad: false,
        operationError: null,
        error: null,
      };

    default:
      return state;
  
  }
};

export default reducer;
