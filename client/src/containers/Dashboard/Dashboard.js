import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";

import { Box, Toolbar, makeStyles, CircularProgress } from "@material-ui/core";

import * as constants from "../../constants";

import DashboardAppBar from "../../components/DashboardAppBar/DashboardAppBar";
import DashboardProfile from "../../components/DashboardProfile/DashboardProfile";
import FullscreenSpinner from "../../components/FullscreenSpinner/FullscreenSpinner";
import DashboardSideDrawer from "../../components/DashboardSideDrawer/DashboardSideDrawer";
import DashboardClassrooms from "../../components/DashboardClassrooms/DashboardClassrooms";
import DashboardTeacherClassrooms from "../../components/DashboardTeacherClassrooms/DashboardTeacherClassrooms";
import DashboardStudentClassrooms from "../../components/DashboardStudentClassrooms/DashboardStudentClassrooms";

import withAlerts from "../../hoc/withAlerts";

import actions from "../../store/actions";

const useStyles = makeStyles((theme) => ({
  main: {
    width: `calc(100vw - ${constants.DRAWER_WIDTH})`,
    marginLeft: `${constants.DRAWER_WIDTH}`,
    minHeight: "100vh",
    height: "auto",
    "@media (max-width: 992px)": {
      width: `100vw`,
      marginLeft: "0",
    },
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    width: "100%",
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const {
    isAuth,
    userId,
    opLoad,
    logout,
    profile,
    authToken,
    loadProfile,
    closeAccount,
    updatePassword,
    createClassroom,
    isProfileLoading,
    joinClassroomStudent,
    joinClassroomTeacher,
    updateProfilePicture,
    leaveClassroomStudent,
    leaveClassroomTeacher,
  } = props;
  const [currentTab, setCurrentTab] = useState(
    constants.TAB_STUDENT_CLASSROOMS
  );
  const [delPass, setDelPass] = useState("");
  const [classroomName, setClassroomName] = useState("");
  const [classroomCode, setClassroomCode] = useState("");
  const [classroomDesc, setClassroomDesc] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [joinDialogStudent, setJoinDialogStudent] = useState(false);
  const [joinDialogTeacher, setJoinDialogTeacher] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const [showCloseAccDialog, setShowCloseAccDialog] = useState(false);
  const [createClassroomDialog, setCreateClassroomDialog] = useState(false);
  // Profile Tab
  const [newDp, setNewDp] = useState(null);
  const [newName, setNewName] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassConf, setNewPassConf] = useState("");
  const [showDpDialog, setShowDpDialog] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  // console.log(profile);

  useEffect(() => {
    if (isAuth) {
      loadProfile(authToken);
    }
    // eslint-disable-next-line
  }, [isAuth]);

  if (isProfileLoading) {
    return <FullscreenSpinner />;
  }

  // DETERMINE CURRENT TAB
  let currentTabView = null;
  switch (currentTab) {
    case constants.TAB_STUDENT_CLASSROOMS:
      currentTabView = (
        <DashboardStudentClassrooms
          showJoinDialog={joinDialogStudent}
          onShowJoinDialog={() => setJoinDialogStudent(true)}
          onCloseJoinDialog={() => {
            setJoinDialogStudent(false);
            setClassroomCode("");
          }}
          classroomCode={classroomCode}
          setClassroomCode={(e) => setClassroomCode(e.target.value)}
          classrooms={profile.studentClassrooms}
          joinClassroom={() => {
            setJoinDialogStudent(false);
            joinClassroomStudent(classroomCode, authToken);
          }}
        />
      );
      break;
    case constants.TAB_TEACHER_CLASSROOMS:
      currentTabView = (
        <DashboardTeacherClassrooms
          showJoinDialog={joinDialogTeacher}
          onShowJoinDialog={() => setJoinDialogTeacher(true)}
          onCloseJoinDialog={() => {
            setJoinDialogTeacher(false);
            setClassroomCode("");
          }}
          classroomCode={classroomCode}
          setClassroomCode={(e) => setClassroomCode(e.target.value)}
          classrooms={profile.teacherClassrooms}
          teacherPassword={teacherPassword}
          setTeacherPassword={(e) => setTeacherPassword(e.target.value)}
          showCreateDialog={createClassroomDialog}
          onCloseCreateDialog={() => setCreateClassroomDialog(false)}
          onShowCreateDialog={() => setCreateClassroomDialog(true)}
          classroomName={classroomName}
          setClassroomName={(e) => setClassroomName(e.target.value)}
          classroomDescription={classroomDesc}
          setClassroomDescription={(e) => setClassroomDesc(e.target.value)}
          createClassroom={() => {
            setCreateClassroomDialog(false);
            createClassroom(
              classroomName,
              classroomDesc,
              teacherPassword,
              props.authToken
            );
          }}
          joinClassroom={() => {
            setJoinDialogTeacher(false);
            joinClassroomTeacher(classroomCode, teacherPassword, authToken);
          }}
        />
      );
      break;
    case constants.TAB_SETTINGS_PROFILE:
      currentTabView = (
        <DashboardProfile
          setName={(e) => setNewName(e.target.value)}
          newName={newName}
          showNameDialog={showNameDialog}
          openNameDialog={() => setShowNameDialog(true)}
          closeNameDialog={() => {
            setShowNameDialog(false);
            setNewName("");
          }}
          setEmail={(e) => setNewEmail(e.target.value)}
          email={newEmail}
          showEmailDialog={showEmailDialog}
          openDialog={() => setShowEmailDialog(true)}
          closeEmailDialog={() => {
            setShowEmailDialog(false);
            setNewEmail("");
          }}
          oldPass={oldPass}
          setOldPass={(e) => setOldPass(e.target.value)}
          newPass={newPass}
          setNewPass={(e) => setNewPass(e.target.value)}
          newPassConf={newPassConf}
          setNewPassConf={(e) => setNewPassConf(e.target.value)}
          newDp={newDp}
          setNewDp={(e) => setNewDp(e.target.files[0])}
          showDpDialog={showDpDialog}
          openDpDialog={() => setShowDpDialog(true)}
          closeDpDialog={() => {
            setShowDpDialog(false);
            setNewDp(null);
          }}
          profile={profile}
          updateProfilePicture={() => {
            updateProfilePicture(newDp, authToken);
            setShowDpDialog(false);
            setNewDp(null);
          }}
          updatePassword={() => {
            updatePassword(oldPass, newPass, authToken);
            setOldPass("");
            setNewPass("");
            setNewPassConf("");
          }}
          showCloseAccDialog={showCloseAccDialog}
          openCloseAccDialog={() => setShowCloseAccDialog(true)}
          closeCloseAccDialog={() => {
            setShowCloseAccDialog(false);
            setDelPass("");
          }}
          delPass={delPass}
          setDelPass={(e) => setDelPass(e.target.value)}
          closeAccount={() => {
            closeAccount(authToken, delPass);
            setShowCloseAccDialog(false);
            setDelPass("");
          }}
        />
      );
      break;
    case constants.TAB_SETTINGS_CLASSROOM:
      currentTabView = (
        <DashboardClassrooms
          studentClassrooms={profile.studentClassrooms}
          teacherClassrooms={profile.teacherClassrooms}
          leaveClassroomTeacher={leaveClassroomTeacher}
          leaveClassroomStudent={leaveClassroomStudent}
          token={authToken}
          id={userId}
        />
      );
      break;
    default:
      currentTabView = (
        <DashboardStudentClassrooms
          showJoinDialog={joinDialogStudent}
          onShowJoinDialog={() => setJoinDialogStudent(true)}
          onCloseJoinDialog={() => {
            setJoinDialogStudent(false);
            setClassroomCode("");
          }}
          classroomCode={classroomCode}
          setClassroomCode={(e) => setClassroomCode(e.target.value)}
          classrooms={profile.studentClassrooms}
          joinClassroom={() => {
            setJoinDialogStudent(false);
            joinClassroomStudent(classroomCode, authToken);
          }}
        />
      );
  }

  return (
    <Fragment>
      <DashboardAppBar
        openMenu={() => setShowDashboardMenu(true)}
        logout={logout}
      />
      <DashboardSideDrawer
        showMenu={showDashboardMenu}
        closeMenu={() => setShowDashboardMenu(false)}
        currentTab={currentTab}
        setTab={setCurrentTab}
      />
      <Box className={classes.main}>
        <Toolbar />
        {opLoad ? (
          <Box className={classes.loader}>
            <CircularProgress />
          </Box>
        ) : (
          currentTabView
        )}
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  isProfileLoading: state.profile.loading,
  profile: state.profile,
  authToken: state.auth.token,
  isAuth: state.auth.isAuth,
  opLoad: state.profile.operationLoad,
  info: state.info,
  userId: state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  loadProfile: (token) => dispatch(actions.loadProfileData(token)),
  createClassroom: (name, description, teacherPassword, token) =>
    dispatch(
      actions.createClassroom(name, description, teacherPassword, token)
    ),
  joinClassroomStudent: (code, token) =>
    dispatch(actions.joinClassStudent(code, token)),
  joinClassroomTeacher: (code, teacherPassword, token) =>
    dispatch(actions.joinClassroomTeacher(code, teacherPassword, token)),
  updateProfilePicture: (file, token) =>
    dispatch(actions.updateProfilePicture(file, token)),
  updatePassword: (oldPassword, newPassword, token) =>
    dispatch(actions.updateProfilePassword(oldPassword, newPassword, token)),
  clearInfoMsg: () => dispatch(actions.clearInfoMsg()),
  clearErrorMsg: () => dispatch(actions.clearErrorMsg()),
  leaveClassroomTeacher: (cid, token) =>
    dispatch(actions.leaveClassroomTeacher(cid, token)),
  leaveClassroomStudent: (cid, token) =>
    dispatch(actions.leaveClassroomStudent(cid, token)),
  logout: () => dispatch(actions.logout()),
  closeAccount: (token, password) =>
    dispatch(actions.closeAccount(token, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAlerts(Dashboard));
