const router = require("express").Router();
const {
  validateToken,
  isMember,
  isHead,
  isFaculty
} = require("../middlewares/protection-middlewares");
const {
  getClassroom,
  addAnnouncement,
  addLecture,
  addLectureNote,
  delLectureNote,
  getLecture,
  newClassroom,
  delLecture,
  delAnnouncement,
  getAnnouncement,
  changeHead,
  // addCommentToAnnouncement,
  // delCommentfromAnnouncement,
  removeStudent,
  removeTeacher,
  deleteClassroom,
  getClassPass
} = require("../controllers/classroom-controller");

const { upload } = require("../config/multer-config");

router.get("/", [validateToken, isMember], getClassroom);

router.post("/", validateToken, newClassroom);

// LECTURE ROUTES

router.post("/:cid/lecture", addLecture);

router.get("/:cid/lecture/:lid", getLecture);

router.delete("/:cid/lecture/:lid", delLecture);

router.post("/:cid/lecture/:lid/note", upload.single("note"), addLectureNote);

router.delete("/:cid/lecture/:lid/note/:noteId", delLectureNote);

// ANNOUNCEMENT ROUTES

router.get("/announcement/:aid", getAnnouncement);

router.post(
  "/:cid/announcement",
  upload.array("attachment", 10),
  addAnnouncement
);

router.delete("/:cid/announcement/:aid", [validateToken], delAnnouncement);

// router.post(
//   "/announcement/:aid/comment",
//   validateToken,
//   addCommentToAnnouncement
// );

// router.delete(
//   "/announcement/:aid/comment/:commentId",
//   validateToken,
//   delCommentfromAnnouncement
// );

// CLASSROOM SETTINGS

router.put(`/:cid/head`, [validateToken], changeHead);

router.post("/:cid/remove/student", [validateToken], removeStudent);

router.post("/:cid/remove/faculty", [validateToken], removeTeacher);

router.delete('/:cid', [validateToken, isHead], deleteClassroom);

router.get('/:cid/password', [validateToken, isHead], getClassPass);

module.exports = router;
