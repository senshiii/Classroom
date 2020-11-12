import axios from "../../axios";
import * as types from "../types";
import actions from "./";

const profileOperationLoadStart = () => ({
  type: types.PROFILE_OPERATION_LOAD_START,
});

const profileOperationLoadStop = () => ({
  type: types.PROFILE_OPERATION_LOAD_STOP,
});

export const clearProfileOperationError = () => ({
  type: types.CLEAR_PROFILE_OPERATION_ERROR,
});

const loadProfileStart = () => ({
  type: types.LOAD_PROFILE,
});

const setProfile = (profile) => ({
  type: types.SET_PROFILE,
  profile,
});

const setProfileFailed = (error) => ({
  type: types.LOAD_PROFILE_FAILED,
  error,
});

export const loadProfileData = (token) => (dispatch) => {
  dispatch(loadProfileStart());
  axios
    .get("/u/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("My Profile Data: ", res.data);
      dispatch(setProfile(res.data));
      dispatch(actions.clearRedirects());
    })
    .catch((err) => {
      // console.log("Error loading Profile Data: ", err);
      dispatch(setProfileFailed(err));
    });
};

const createClassroomSuccess = (profile) => ({
  type: types.CREATE_CLASSROOM,
  profile,
});

export const createClassroom = (name, description, teacherPassword, token) => (
  dispatch
) => {
  // console.log(token);
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/c",
      { name, description, teacherPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("New Classroom: ", res.data);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(createClassroomSuccess(res.data.data));
    })
    .catch((err) => {
      // console.log("Error creating classroom: ", err);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const joinClassroomStudentSuccess = (profile) => ({
  type: types.JOIN_CLASSROOM_STUDENT,
  profile,
});

export const joinClassStudent = (code, token) => (dispatch) => {
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/u/join/student",
      { code },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((res) => {
      // console.log("Join Class Student: ", res.data);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(joinClassroomStudentSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
      // console.log("Join Class Student Error: ", err, err.response);
    });
};

const joinClassroomTeacherSuccess = (profile) => ({
  type: types.JOIN_CLASSROOM_TEACHER,
  profile,
});

export const joinClassroomTeacher = (code, teacherPassword, token) => (
  dispatch
) => {
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/u/join/faculty",
      { code, teacherPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log(res.data);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(joinClassroomTeacherSuccess(res.data.data));
    })
    .catch((err) => {
      // console.log("Join Classroom Teacher Error: ", err);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const updateProfilePictureSuccess = (dp) => ({
  type: types.UPDATE_PROFILE_PICTURE,
  dp,
});

export const updateProfilePicture = (file, token) => (dispatch) => {
  dispatch(profileOperationLoadStart());
  const formData = new FormData();
  formData.append("image", file);
  axios
    .patch("/u/dp", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Uploaded Profile Picture", res.data);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(updateProfilePictureSuccess(res.data.data));
    })
    .catch((err) => {
      // console.log("Error Updating Profile Picture", err);
      // console.log("Error Updating Profile Picture", err.response);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

export const updateProfilePasswordSuccess = () => ({
  type: types.UPDATE_PROFILE_PASSWORD,
});

export const updateProfilePassword = (oldPassword, newPassword, token) => (
  dispatch
) => {
  dispatch(profileOperationLoadStart());
  axios
    .patch(
      "/u/password",
      { newPassword, oldPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("Password Updation Response: ", res.data);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
    })
    .catch((err) => {
      // console.log("Error updating Password: ", err, err.response);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const leaveClassroomSuccess = (profile) => ({
  type: types.LEAVE_CLASSROOM,
  profile,
});

export const leaveClassroomTeacher = (cid, token) => (dispatch) => {
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/u/leave/faculty",
      { cid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("Leave Classroom Teacher: ", res);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(leaveClassroomSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

export const leaveClassroomStudent = (cid, token) => (dispatch) => {
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/u/leave/student",
      { cid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("Leaving Class Student Result", res);
      dispatch(profileOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(leaveClassroomSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const closeAccountSuccess = () => ({
  type: types.CLOSE_ACCOUNT,
});

export const closeAccount = (token, password) => (dispatch) => {
  dispatch(profileOperationLoadStart());
  axios
    .post(
      "/u/",
      { password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      // console.log("Close Account: ", res);
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(closeAccountSuccess());
      dispatch(profileOperationLoadStop());
      dispatch(actions.logout());
    })
    .catch((err) => {
      dispatch(profileOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};
