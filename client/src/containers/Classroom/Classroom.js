import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Toolbar, Box, makeStyles, CircularProgress } from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import ClassroomAppBar from "../../components/ClassroomAppBar/ClassroomAppBar";
import ClassroomManage from "../../components/ClassroomManage/ClassroomManage";
import ClassroomSideBar from "../../components/ClassroomSidebar/ClassroomSidebar";
import ClassroomMembers from "../../components/ClassroomMembers/ClassroomMembers";
import ClassroomLecture from "../../components/ClassroomLecture/ClassroomLecture";
import ClassroomLectures from "../../components/ClassroomLectures/ClassroomLectures";
import FullWidthSpinner from "../../components/FullscreenSpinner2/FullScreenSpinner";
import ClassroomAnnouncements from "../../components/ClassroomAnnouncements/ClassroomAnnouncements";
import withAlerts from "../../hoc/withAlerts";

import * as constant from "../../constants";

import actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  main: {
    width: `100vw`,
    marginLeft: "0",
    [theme.breakpoints.up("md")]: {
      width: `calc(100vw - ${constant.DRAWER_WIDTH})`,
      marginLeft: `${constant.DRAWER_WIDTH}`,
    },
    minHeight: "100vh",
    height: "auto",
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    width: "100%",
  },
}));

const Classroom = (props) => {
  const classes = useStyles();
  const [topic, setTopic] = useState("");
  const [annLink, setAnnLink] = useState("");
  const [annDesc, setAnnDesc] = useState("");
  const [annTitle, setannTitle] = useState("");
  const [annLinks, setAnnLinks] = useState([]);
  const [noteFile, setNoteFile] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [delClassPass, setDelClassPass] = useState("");
  const [annLinkTitle, setAnnLinkTitle] = useState("");
  const [annAttachments, setAnnAttachments] = useState([]);
  const [showAddAnnDialog, setShowAddAnnDialog] = useState(false);
  const [showClassroomMenu, setShowClassroomMenu] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState(constant.TAB_LECTURES);
  const [showAddLectureDialog, setShowAddLectureDialog] = useState(false);
  const [showDelClassroomDialog, setShowDelClassroomDialog] = useState(false);

  const {
    token,
    isAuth,
    userId,
    loading,
    addNote,
    lecture,
    editable,
    classroom,
    addLecture,
    delLecture,
    redirectTD,
    setLecture,
    delClassroom,
    removeStudent,
    getClassPass,
    removeTeacher,
    upgradeToHead,
    delLectureNote,
    clearClassroom,
    delAnnouncement,
    addAnnouncement,
    loadClassroomData,
    isClassroomLoading,
  } = props;

  const history = useHistory();

  // ROUTE SPECIFIC INFORMATION
  const { code } = useParams();

  useEffect(() => {
    if (isAuth) {
      loadClassroomData(code, token);
    }
  }, [isAuth, loadClassroomData, token, code]);

  useEffect(() => {
    if (!isClassroomLoading && redirectTD) {
      history.replace("/dashboard");
    }
  }, [redirectTD, isClassroomLoading, history]);

  const addLectureHandler = useCallback(() => {
    setShowAddLectureDialog(false);
    addLecture(topic, classroom._id);
    setTopic("");
  }, [addLecture, topic, classroom]);

  const addNoteHandler = useCallback(() => {
    addNote(noteTitle, noteFile, classroom._id, lecture._id);
    setShowAddNoteDialog(false);
    setNoteFile("");
    setNoteTitle("");
  }, [noteTitle, noteFile, classroom, lecture, addNote]);

  const deleteAnnAttachment = useCallback(
    (inx) => {
      let updatedAttachment = annAttachments.filter(
        (_, index) => inx !== index
      );
      setAnnAttachments(updatedAttachment);
    },
    [annAttachments, setAnnAttachments]
  );

  const setLinks = useCallback(() => {
    setAnnLinks([
      ...JSON.parse(JSON.stringify(annLinks)),
      { title: annLinkTitle, link: annLink },
    ]);
    setAnnLink("");
    setAnnLinkTitle("");
  }, [
    setAnnLinks,
    annLink,
    annLinkTitle,
    setAnnLink,
    setAnnLinkTitle,
    annLinks,
  ]);

  const delLink = useCallback(
    (inx) => {
      let updatedLinks = annLinks.filter((_, index) => inx !== index);
      setAnnLinks(updatedLinks);
    },
    [annLinks, setAnnLinks]
  );

  if (isClassroomLoading) return <FullWidthSpinner />;

  let currentTabView = null;
  switch (currentTab) {
    case constant.TAB_LECTURES:
      currentTabView = (
        <ClassroomLectures
          editable={editable}
          lectures={classroom ? classroom.lectures : []}
          showDialog={showAddLectureDialog}
          toggleDialog={() => setShowAddLectureDialog(!showAddLectureDialog)}
          closeDialog={() => {
            setShowAddLectureDialog(false);
            setTopic("");
          }}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          addLecture={addLectureHandler}
          setLecture={setLecture}
          setTab={setCurrentTab}
          deleteLecture={delLecture}
          token={token}
          cid={classroom ? classroom._id : ""}
        />
      );
      break;
    case constant.TAB_ASSIGNMENTS:
      currentTabView = (
        <ClassroomAnnouncements
          editable={editable}
          announcements={classroom ? classroom.announcements : []}
          showDialog={showAddAnnDialog}
          toggleDialog={() => setShowAddAnnDialog(!showAddAnnDialog)}
          title={annTitle}
          setTitle={(e) => setannTitle(e.target.value)}
          desc={annDesc}
          setDesc={(e) => setAnnDesc(e.target.value)}
          attachments={annAttachments}
          setAttachments={(e) =>
            setAnnAttachments([...annAttachments, e.target.files[0]])
          }
          cancel={() => {
            setannTitle("");
            setAnnDesc("");
            setAnnAttachments([]);
            setShowAddAnnDialog(false);
          }}
          delAttachment={deleteAnnAttachment}
          linkTitle={annLinkTitle}
          setLinkTitle={(e) => setAnnLinkTitle(e.target.value)}
          link={annLink}
          setLink={(e) => setAnnLink(e.target.value)}
          links={annLinks}
          setLinks={setLinks}
          delLink={delLink}
          addAnnouncement={() => {
            addAnnouncement(
              annTitle,
              annDesc,
              annLinks,
              annAttachments,
              classroom._id
            );
            setannTitle("");
            setAnnDesc("");
            setShowAddAnnDialog(false);
            setAnnLinks([]);
            setAnnAttachments([]);
            setAnnLinkTitle("");
            setAnnLink("");
          }}
          delAnnouncement={delAnnouncement}
          token={token}
          cid={classroom._id}
        />
      );
      break;
    case constant.TAB_LECTURE:
      currentTabView = (
        <ClassroomLecture
          editable={editable}
          lecture={lecture}
          goBack={() => {
            setLecture(null);
            setCurrentTab("LECTURES");
          }}
          showDialog={showAddNoteDialog}
          toggleDialog={() => setShowAddNoteDialog(!showAddNoteDialog)}
          noteTitle={noteTitle}
          setTitle={(e) => setNoteTitle(e.target.value)}
          setFile={setNoteFile}
          addNote={addNoteHandler}
          cid={classroom._id}
          delLectureNote={delLectureNote}
        />
      );
      break;
    case constant.TAB_MEMBERS:
      currentTabView = (
        <ClassroomMembers
          students={classroom ? classroom.students : []}
          faculties={classroom ? classroom.faculties : []}
          head={classroom ? classroom.head : null}
          code={classroom ? classroom.code : null}
        />
      );
      break;
    case constant.TAB_MANAGE:
      currentTabView = (
        <ClassroomManage
          students={classroom ? classroom.students : []}
          faculties={classroom ? classroom.faculties : []}
          headId={classroom ? classroom.head.id : ""}
          cid={classroom ? classroom._id : ""}
          token={token}
          upgrade={upgradeToHead}
          removeStudent={removeStudent}
          removeTeacher={removeTeacher}
          showDelDialog={showDelClassroomDialog}
          openDelDialog={() => setShowDelClassroomDialog(true)}
          closeDelDialog={() => setShowDelClassroomDialog(false)}
          delPass={delClassPass}
          setDelPass={(e) => setDelClassPass(e.target.value)}
          delClass={() => {
            delClassroom(token, classroom._id, delClassPass);
            setShowDelClassroomDialog(false);
          }}
          getPass={() => getClassPass(token, classroom._id)}
        />
      );
      break;
    default:
      currentTabView = (
        <ClassroomLectures
          editable={editable}
          lectures={classroom ? classroom.lectures : []}
          showDialog={showAddLectureDialog}
          toggleDialog={() => setShowAddLectureDialog(!showAddLectureDialog)}
          closeDialog={() => {
            setShowAddLectureDialog(false);
            setTopic("");
          }}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          addLecture={() => {
            setShowAddLectureDialog(false);
            addLecture(topic, classroom._id);
            setTopic("");
          }}
          setLecture={setLecture}
          setTab={setCurrentTab}
        />
      );
  }

  return (
    <Fragment>
      <ClassroomAppBar
        name={classroom ? classroom.name : ""}
        desc={classroom ? classroom.description : ""}
        code={classroom ? classroom.code : ""}
        openMobileMenu={() => setShowClassroomMenu(true)}
        head={classroom && classroom.head}
        cid={classroom ? classroom._id : ""}
      />
      {/* <Toolbar /> */}
      <ClassroomSideBar
        showMenu={showClassroomMenu}
        onClose={() => setShowClassroomMenu(false)}
        onOpen={() => setShowClassroomMenu(true)}
        tab={currentTab}
        setTab={setCurrentTab}
        editable={editable}
        isHead={classroom ? classroom.head.id === userId : false}
        goBackToDashboard={() => {
          history.replace("/dashboard");
          clearClassroom();
        }}
      />
      <div className={classes.main}>
        <Toolbar />
        {loading ? (
          <Box className={classes.loader}>
            <CircularProgress />
          </Box>
        ) : (
          currentTabView
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
  userId: state.auth.id,
  token: state.auth.token,
  isAuth: state.auth.isAuth,
  editable: state.classroom.editable,
  classroom: state.classroom.classroom,
  loading: state.classroom.operationLoad,
  lecture: state.classroom.currentLecture,
  isClassroomLoading: state.classroom.loading,
  redirectTD: state.classroom.redirectToDashboard,
});

const mapDispatchToProps = (dispatch) => ({
  loadClassroomData: (code, token) =>
    dispatch(actions.loadClassroom(code, token)),
  addLecture: (topic, cid) => dispatch(actions.addLecture(topic, cid)),
  addNote: (title, file, cid, lid) =>
    dispatch(actions.addLectureNote(title, file, cid, lid)),
  setLecture: (lecture) => dispatch(actions.setCurrentLecture(lecture)),
  addAnnouncement: (title, desc, links, attachments, cid) =>
    dispatch(actions.addAnnouncement(title, desc, links, attachments, cid)),
  delLectureNote: (cid, lid, noteId) =>
    dispatch(actions.delLectureNote(cid, lid, noteId)),
  delAnnouncement: (cid, aid, token) =>
    dispatch(actions.delAnnouncement(cid, aid, token)),
  upgradeToHead: (cid, tid, token) =>
    dispatch(actions.upgradeToHead(cid, tid, token)),
  delLecture: (cid, lid, token) =>
    dispatch(actions.delLecture(cid, lid, token)),
  clearInfoMsg: () => dispatch(actions.clearInfoMsg()),
  clearErrorMsg: () => dispatch(actions.clearErrorMsg()),
  removeStudent: (cid, sid, token) =>
    dispatch(actions.removeStudent(cid, sid, token)),
  removeTeacher: (cid, fid, token) =>
    dispatch(actions.removeTeacher(cid, fid, token)),
  delClassroom: (token, cid, password) =>
    dispatch(actions.delClassroom(token, cid, password)),
  getClassPass: (token, cid) => dispatch(actions.getClassPass(token, cid)),
  clearClassroom: () => dispatch(actions.clearClassroom()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(Classroom));
