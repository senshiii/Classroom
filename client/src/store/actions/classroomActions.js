import * as types from "../types";
import axios from "../../axios";
import getFormData from "../../utils/formUtils";
import { ERROR_MSG } from "../../constants";
import actions from "../actions";

const loadClassroomStarted = () => ({
  type: types.LOAD_CLASSROOM,
});

const loadClassroomSuccess = (classroom) => ({
  type: types.SET_CLASSROOM,
  classroom,
});

const loadClassroomFailed = (error) => ({
  type: types.LOAD_CLASSROOM_FAILED,
  error,
});

export const loadClassroom = (code, token) => (dispatch) => {
  dispatch(loadClassroomStarted());
  // console.log(token);
  axios
    .get(`/c?code=${code}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Classroom Data: ", res.data);
      dispatch(loadClassroomSuccess(res.data));
    })
    .catch((err) => {
      // console.log(err);
      loadClassroomFailed(err);
    });
};

const classOperationLoadStart = () => ({
  type: types.CLASSROOM_OPERTAION_LOAD_START,
});

const classOperationLoadStop = () => ({
  type: types.CLASSROOM_OPERTAION_LOAD_STOP,
});

const classOperationError = (error) => ({
  type: types.CLASSROOM_OP_ERROR,
  error,
});

export const clearClassOperationError = () => ({
  type: types.CLEAR_CLASSROOM_OP_ERROR,
});

const addLectureSuccess = (lecture) => ({
  type: types.ADD_LECTURE,
  lecture,
});

export const addLecture = (topic, cid) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .post(`/c/${cid}/lecture`, { topic })
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(addLectureSuccess(res.data.data));
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
      // console.log(err);
    });
};

export const setCurrentLecture = (lecture) => ({
  type: types.SET_CURRENT_LECTURE,
  lecture,
});

const addNoteSuccess = (lecture) => ({
  type: types.ADD_NOTE,
  lecture,
});

export const addLectureNote = (title, file, cid, lid) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .post(`/c/${cid}/lecture/${lid}/note`, getFormData({ title, note: file }), {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(addNoteSuccess(res.data.data));
      dispatch(setCurrentLecture(res.data.data));
      dispatch(actions.setInfoMessage(res.data.status.message));
      // console.log("Added note: ", res.data);
    })
    .catch((err) => {
      // console.log("Error Adding Note: ", err);
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const addAnnouncementSuccess = (announcement) => ({
  type: types.ADD_ANNOUNCEMENT,
  announcement,
});

export const addAnnouncement = (
  title,
  description,
  links,
  attachments,
  cid
) => (dispatch) => {
  dispatch(classOperationLoadStart());
  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  for (let attach of attachments) formData.append("attachment", attach);
  formData.append("links", JSON.stringify(links));
  axios
    .post(`/c/${cid}/announcement`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      // console.log(res);
      dispatch(classOperationLoadStop());
      dispatch(addAnnouncementSuccess(res.data));
    })
    .catch((err) => {
      // console.log(err);
      dispatch(classOperationLoadStop());
      let errMsg = err.response.data.msg;
      dispatch(
        classOperationError(errMsg ? errMsg : "Unexpected Error Occuredd")
      );
    });
};

const delLectureNoteSuccess = (lecture) => ({
  type: types.DELETE_LECTURE_NOTE,
  lecture,
});

export const delLectureNote = (cid, lid, noteId) => (dispatch) => {
  // console.log(cid, lid, noteId);
  dispatch(classOperationLoadStart());
  axios
    .delete(`/c/${cid}/lecture/${lid}/note/${noteId}`)
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(delLectureNoteSuccess(res.data));
    })
    .catch((err) => {
      // console.log("Error while deleting Note: ", err, err.response);
      let errMsg =
        err.response && err.response.data
          ? err.response.data.msg
          : "Unknown Server Error! Try again later.";
      dispatch(classOperationLoadStop());
      dispatch(classOperationError(errMsg));
    });
};

const delAnnouncementSuccess = (announcement) => ({
  type: types.DELETE_ANNOUNCEMENT,
  announcement,
});

export const delAnnouncement = (cid, aid, token) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .delete(`/c/${cid}/announcement/${aid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      // console.log("Deleted Announcement: ", res.data);
      dispatch(classOperationLoadStop());
      dispatch(delAnnouncementSuccess(res.data));
    })
    .catch((err) => {
      // console.log(err);
      let errMsg =
        err.response.data && err.reponse.data.msg
          ? err.response.data.msg
          : ERROR_MSG;
      dispatch(classOperationLoadStop());
      dispatch(classOperationError(errMsg));
    });
};

const upgradeToHeadSuccess = (head) => ({
  type: types.UPGRADE_TO_HEAD,
  head,
});

export const upgradeToHead = (cid, teacherId, token) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .put(
      `/c/${cid}/head`,
      { teacherId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(upgradeToHeadSuccess(res.data.data));
      dispatch(actions.setInfoMessage(res.data.status.message));
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const delLectureSuccess = (lecture) => ({
  type: types.DELETE_LECTURE,
  lecture,
});

export const delLecture = (cid, lid, token) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .delete(`/c/${cid}/lecture/${lid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(delLectureSuccess(res.data.data));
      dispatch(setCurrentLecture(null));
      dispatch(actions.setInfoMessage(res.data.status.message));
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const removeStudentSuccess = (sid) => ({
  type: types.REMOVE_STUDENT,
  sid,
});

export const removeStudent = (cid, sid, token) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .post(
      `/c/${cid}/remove/student`,
      { sid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(removeStudentSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

const removeTeacherSuccess = (fid) => ({
  type: types.REMOVE_TEACHER,
  fid,
});

export const removeTeacher = (cid, fid, token) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .post(
      `/c/${cid}/remove/faculty`,
      { fid },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(removeTeacherSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

export const clearClassroom = () => ({ type: types.CLEAR_CLASSROOM });

export const clearRedirects = () => ({ type: types.CLEAR_REDIRECTS });

export const delClassroom = (token, cid, password) => (dispatch) => {
  dispatch(classOperationLoadStart());
  axios
    .delete(`/c/${cid}?password=${password}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setInfoMessage(res.data.status.message));
      dispatch(clearClassroom());
    })
    .catch((err) => {
      dispatch(classOperationLoadStop());
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};

export const getClassPass = (token, cid) => (dispatch) => {
  axios
    .get(`/c/${cid}/password`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(actions.setInfoMessage(res.data.status.message));
    })
    .catch((err) => {
      dispatch(actions.setErrorMessage(err.response.data.status.message));
    });
};
