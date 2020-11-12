import * as types from "../types";

const initState = {
  classroom: null,
  loading: false,
  error: null,
  operationLoad: false,
  operationError: null,
  currentLecture: null,
  editable: null,
  redirectToDashboard: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case types.LOAD_CLASSROOM:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.SET_CLASSROOM:
      return {
        ...state,
        editable: action.classroom.editable,
        classroom: action.classroom.value,
        redirectToDashboard: false,
        loading: false,
      };

    case types.LOAD_CLASSROOM_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case types.CLASSROOM_OPERTAION_LOAD_START:
      return {
        ...state,
        operationLoad: true,
      };

    case types.CLASSROOM_OPERTAION_LOAD_STOP:
      return {
        ...state,
        operationLoad: false,
      };

    case types.CLASSROOM_OP_ERROR:
      return {
        ...state,
        operationError: action.error,
      };

    case types.CLEAR_CLASSROOM_OP_ERROR:
      return {
        ...state,
        operationError: null,
      };

    case types.ADD_LECTURE:
      const lectures = JSON.parse(JSON.stringify(state.classroom.lectures));
      lectures.push(action.lecture);
      // console.log(lectures);
      return {
        ...state,
        classroom: {
          ...state.classroom,
          lectures,
        },
      };

    case types.SET_CURRENT_LECTURE:
      return {
        ...state,
        currentLecture: action.lecture,
      };

    case types.ADD_NOTE:
      const noteClass = JSON.parse(JSON.stringify(state.classroom));
      noteClass.lectures = noteClass.lectures.map((lec) =>
        lec._id === action.lecture._id ? action.lecture : lec
      );
      return {
        ...state,
        classroom: noteClass,
      };

    case types.ADD_ANNOUNCEMENT:
      const prevClassroom = JSON.parse(JSON.stringify(state.classroom));
      prevClassroom.announcements.push(action.announcement);
      return {
        ...state,
        classroom: prevClassroom,
      };

    case types.DELETE_LECTURE_NOTE:
      let classroom = JSON.parse(JSON.stringify(state.classroom));
      classroom.lectures = classroom.lectures.map((lec) =>
        lec._id !== action.lecture._id ? action.lecture : lec
      );
      return {
        ...state,
        classroom,
        currentLecture: action.lecture,
      };

    case types.DELETE_ANNOUNCEMENT:
      let prevClass = JSON.parse(JSON.stringify(state.classroom));
      prevClass.announcements = prevClass.announcements.filter(
        (ann) => ann._id !== action.announcement._id
      );
      return {
        ...state,
        classroom: prevClass,
        currentClass: prevClass,
      };

    case types.UPGRADE_TO_HEAD:
      const changedHeadClass = JSON.parse(JSON.stringify(state.classroom));
      changedHeadClass.head = action.head;
      return {
        ...state,
        classroom: changedHeadClass,
        redirectToDashboard: true,
      };

    case types.DELETE_LECTURE:
      const delLectureClass = JSON.parse(JSON.stringify(state.classroom));
      delLectureClass.lectures = delLectureClass.lectures.filter(
        (lecture) => lecture._id !== action.lecture._id
      );
      return {
        ...state,
        classroom: delLectureClass,
      };

    case types.REMOVE_STUDENT:
      const remClass = JSON.parse(JSON.stringify(state.classroom));
      remClass.students = remClass.students.filter(
        (stud) => stud._id !== action.sid
      );
      return {
        ...state,
        classroom: remClass,
      };

    case types.REMOVE_TEACHER:
      const remTeachClass = JSON.parse(JSON.stringify(state.classroom));
      remTeachClass.faculties = remTeachClass.faculties.filter(
        (fac) => fac._id !== action.fid
      );
      return {
        ...state,
        classroom: remTeachClass,
      };

    case types.CLEAR_CLASSROOM:
      return {
        ...state,
        classroom: null,
        loading: false,
        error: null,
        operationLoad: false,
        operationError: null,
        currentLecture: null,
        editable: null,
        redirectToDashboard: true,
      };

    case types.CLEAR_REDIRECTS:
      return {
        ...state,
        redirectToDashboard: false,
      };

    default:
      return state;
  }
};
