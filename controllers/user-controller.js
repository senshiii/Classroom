const Classroom = require("../models/Classroom");
const User = require("../models/User");
const queryString = require("querystring");
const { uploadFile, deleteFile } = require("../config/aws-config");
const bcrypt = require("bcrypt");
const response = require("../utils/response");
const { sendMail } = require("../config/nodemailer-config");

exports.joinClassStudent = (req, res, next) => {
  const { code } = req.body;
  User.findById(req.userId)
    .then((user) => {
      if (!user)
        return res.status(404).json(response(false, "Invalid User", null));
      Classroom.findOne({ code })
        .then((classroom) => {
          if (!classroom)
            return res.status(404).json(false, "Classroom Not Found", null);
          if (classroom.faculties.includes(user.id)) {
            return res
              .status(400)
              .json(
                response(
                  false,
                  "You already are a Teacher in this class.  Can't join in as student. If you do wish to join as student. Exit the classroom as a teacher and then join as student",
                  null
                )
              );
          }
          if (classroom.students.includes(user.id)) {
            return res
              .status(400)
              .json(
                response(
                  false,
                  "You are already a student in this classroom!",
                  null
                )
              );
          }
          user.studentClassrooms.push(classroom.id);
          classroom.students.push(user.id);
          user
            .save()
            .then((savedUser) => {
              classroom
                .save()
                .then((savedClass) => {
                  sendMail(
                    savedClass.head.email,
                    "",
                    "",
                    "New Student Enrolled",
                    `<h1>${savedUser.name} has joined your class.</h1>`
                  );
                  const query = queryString.stringify({
                    redirect: true,
                  });
                  res.redirect(`/u/${savedUser.id}/dashboard?${query}`);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.joinClassTeacher = (req, res, next) => {
  const { teacherPassword, code } = req.body;
  User.findById(req.userId)
    .then((user) => {
      if (!user)
        return res.status(404).json(response(false, "Invalid User", null));
      Classroom.findOne({ code })
        .then((classroom) => {
          if (classroom.students.includes(user.id))
            return res
              .status(400)
              .json(
                response(
                  false,
                  "You already are a Student in this class. Can't join in as Teacher. If you do wish to join as a Teacher, exit the classroom as a Student and then join as Teacher",
                  null
                )
              );
          if (classroom.faculties.includes(user.id))
            return res
              .status(400)
              .json(
                response(
                  false,
                  "You are already a Teacher in this classroom",
                  null
                )
              );
          console.log("Teacher Password: ", classroom.teacherPassword);
          console.log(req.body);
          if (teacherPassword != classroom.teacherPassword) {
            // TODO: APPLY BCRYPT HERE
            return res
              .status(403)
              .json(response(false, "Incorrect Joining Password", null));
          } else {
            user.teacherClassrooms.push(classroom.id);
            classroom.faculties.push(user.id);
            user
              .save()
              .then((user) => {
                classroom
                  .save()
                  .then((_) => {
                    const query = queryString.stringify({
                      redirect: true,
                    });
                    res.redirect(`/u/${user.id}/dashboard?${query}`);
                  })
                  .catch((err) => next(err));
              })
              .catch((err) => next(err));
          }
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.leaveClassTeacher = (req, res, next) => {
  const { cid } = req.body;
  // FIND CLASS
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom)
        return res
          .status(404)
          .json(response(false, "Classroom not found", null));
      if (classroom.head.id == req.userId)
        return res
          .status(400)
          .json(
            response(
              false,
              "Head of the classroom cannot leave the classroom. Appoint someone else as head to leave the class.",
              null
            )
          );
      classroom.faculties = classroom.faculties.filter(
        (faculty) => faculty != req.userId
      );
      classroom
        .save()
        .then((savedClass) => {
          User.findById(req.userId)
            .then((user) => {
              user.teacherClassrooms = user.teacherClassrooms.filter(
                (tClass) => tClass != savedClass.id
              );
              user
                .save()
                .then((savedUser) => {
                  const query = queryString.stringify({
                    redirect: true,
                  });
                  res.redirect(`/u/${savedUser.id}/dashboard?${query}`);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.leaveClassStudent = (req, res, next) => {
  const { cid } = req.body;
  Classroom.findById(cid)
    .then((classroom) => {
      // Filtering Students
      classroom.students = classroom.students.filter(
        (student) => student != req.userId
      );
      classroom
        .save()
        .then((savedClass) => {
          User.findById(req.userId)
            .then((user) => {
              // Filtering Classrooms
              user.studentClassrooms = user.studentClassrooms.filter(
                (studentClassroom) => studentClassroom != savedClass.id
              );
              user
                .save()
                .then((savedUser) => {
                  const query = queryString.stringify({
                    redirect: true,
                  });
                  res.redirect(`/u/${savedUser.id}/dashboard?${query}`);
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.getDashboard = (req, res, next) => {
  User.findById(req.userId)
    .select("-password -createdAt -updatedAt -__v")
    .populate("studentClassrooms", "-__v -updatedAt")
    .populate("teacherClassrooms", "-teacherPassword -__v -updatedAt")
    .exec()
    .then((user) => {
      // console.log("User Dashboard and Profile Information: ", user);
      res.json(user);
    })
    .catch((err) => next(err));
};

exports.getDashboardRedirect = (req, res, next) => {
  const { uid } = req.params;
  const { redirect } = req.query;
  if (!redirect) return next(err);
  User.findById(uid)
    .select("-password -createdAt -updatedAt -__v")
    .populate("studentClassrooms", "-__v -updatedAt")
    .populate("teacherClassrooms", "-teacherPassword -__v -updatedAt")
    .exec()
    .then((user) => {
      // console.log("User Dashboard and Profile Information: ", user);
      res.json(response(true, "Profile Updated", user));
    })
    .catch((err) => next(err));
};

exports.updateProfilePicture = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) return res.status(404).json({ msg: "User not found" });
      if (user.dp.key && user.dp.length > 0) {
        deleteFile(user.dp.key);
      }
      uploadFile(req.file, "images")
        .then((result) => {
          user.dp = { key: result.Key, url: result.Location };
          user
            .save()
            .then((savedUser) =>
              res.json(response(true, "Profile Picture Updated", savedUser.dp))
            )
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.updatePassword = (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  User.findById(req.userId)
    .then((user) => {
      bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
        if (err) return next(err);
        if (isMatch) {
          bcrypt.hash(newPassword, 16, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            user
              .save()
              .then((_) => res.json(response(true, "Password Updated", null)));
          });
        } else {
          return res
            .status(403)
            .json(response(false, "Incorrect Password", null));
        }
      });
    })
    .catch((err) => next(err));
};

exports.closeAccount = (req, res, next) => {
  const { password } = req.body;
  User.findById(req.userId)
    .then((user) => {
      console.log(password, user.password);
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return next(err);
        if (!isMatch)
          return res
            .status(400)
            .json(
              response(
                false,
                "Incorrect Password.Could not close account",
                null
              )
            );
        if (
          user.studentClassrooms.length > 0 ||
          user.teacherClassrooms.length > 0
        )
          return res
            .status(400)
            .json(
              response(
                false,
                "Please exit from all classrooms in order to close account.",
                null
              )
            );
        if (user.dp.key.length > 0) {
          deleteFile(user.dp.key)
            .then((success) => {
              console.log("Error deleting User DP: ", success);
              user
                .remove()
                .then((delUser) =>
                  res.json(
                    response(true, "Account Closed Successfully", delUser)
                  )
                );
            })
            .catch((err) => next(err));
        } else {
          user
            .remove()
            .then((delUser) =>
              res.json(response(true, "Account Closed Successfully", delUser))
            );
        }
      });
    })
    .catch((err) => next(err));
};
