const router = require("express").Router();

const { upload } = require("../config/multer-config");

const {
  joinClassStudent,
  getDashboard,
  joinClassTeacher,
  getDashboardRedirect,
  updateProfilePicture,
  updatePassword,
  leaveClassStudent,
  leaveClassTeacher,
  closeAccount,
} = require("../controllers/user-controller");
const { validateToken } = require("../middlewares/protection-middlewares");

router.post("/join/student", [validateToken], joinClassStudent);

router.post("/join/faculty", [validateToken], joinClassTeacher);

router.post("/leave/student", [validateToken], leaveClassStudent);

router.post("/leave/faculty", [validateToken], leaveClassTeacher);

router.get("/dashboard", [validateToken], getDashboard);

router.get("/:uid/dashboard", getDashboardRedirect);

router.patch(
  "/dp",
  [validateToken, upload.single("image")],
  updateProfilePicture
);

router.patch("/password", [validateToken], updatePassword);

router.post("/", [validateToken], closeAccount);

module.exports = router;
