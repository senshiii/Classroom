const Classroom = require("../models/Classroom");
const User = require("../models/User");
const crypto = require("crypto");
const Lecture = require("../models/Lecture");
const Announcement = require("../models/Announcement");
const queryString = require("querystring");
const { sendMail } = require("../config/nodemailer-config");
const response = require("../utils/response");
const { uploadFile, deleteFile } = require("../config/aws-config");
const { getClassroomPassword } = require("../templates/mail");

exports.getClassroom = (req, res, next) => {
  const { code } = req.query;
  Classroom.findOne({ code })
    .select("-teacherPassword")
    .populate("faculties", "name dp email")
    .populate("announcements")
    .populate("students", "name dp email")
    .populate("lectures")
    .exec()
    .then((classroom) => {
      // console.log(classroom);
      if (!classroom)
        return res.status(404).json({ msg: "Classroom not found." });
      let editable = false;
      User.findById(req.userId)
        .then((user) => {
          if (!user) return res.status(400).json({ msg: "User not found" });
          if (user.teacherClassrooms.includes(classroom.id)) {
            editable = true;
          }
          res.json({
            editable,
            value: classroom,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.newClassroom = (req, res, next) => {
  const { name, description } = req.body;
  User.findById(req.userId)
    .select("-password")
    .then((user) => {
      Classroom.create({
        name,
        description,
        head: { name: user.name, email: user.email, id: user.id },
        code: crypto.randomBytes(3).toString("hex"),
        teacherPassword: require("crypto").randomBytes(6).toString("hex"),
      })
        .then((classroom) => {
          user.teacherClassrooms.push(classroom.id);
          user.save().then((fac) => {
            classroom.faculties.push(fac.id);
            classroom.save().then((_) => {
              const query = queryString.stringify({
                redirect: true,
              });
              res.redirect(`/u/${fac.id}/dashboard?${query}`);
            });
          });
        })
        .catch((err) => {
          next(err);
        });
    });
};

// LECTURE CONTROLLER FUNCTIONS

exports.getLecture = (req, res, next) => {
  const { cid, lid } = req.params;
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom.lectures.includes(lid))
        return res
          .status(404)
          .json({ msg: "Requested lecture does not belong to this class." });
      Lecture.findById(lid)
        .then((lec) => {
          if (!lec)
            return res.status(404).json({ msg: "Lecture doesn't exist" });
          res.json(lec);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.addLecture = (req, res, next) => {
  const { cid } = req.params;
  const { topic } = req.body;
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom)
        return res
          .status(404)
          .json(response(false, "Classroom Deleted.", null));
      Lecture.create({ topic })
        .then((lecture) => {
          classroom.lectures.push(lecture.id);
          classroom
            .save()
            .then((savedClass) => {
              // console.log(savedClass);
              // TODO: SEND MAIL UPDATE TO ALL STUDENTS AND ALL TEACHERS
              res.json(response(true, "Lecture added.", lecture));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.delLecture = (req, res, next) => {
  const { cid, lid } = req.params;
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom)
        return res
          .status(404)
          .json(response(false, "Classroom not found", null));
      Lecture.findById(lid)
        .then((lecture) => {
          if (lecture.notes.length > 0)
            return res
              .status(400)
              .json(
                response(
                  false,
                  "Lecture containing notes can't be deleted. Delete all notes first.",
                  null
                )
              );
          lecture
            .remove()
            .then((delLec) => {
              classroom.lectures = classroom.lectures.filter(
                (lec) => lec != delLec.id
              );
              console.log(delLec);
              console.log(classroom);
              classroom
                .save()
                .then((_) =>
                  res.json(response(true, "Lecture Deleted.", delLec))
                )
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.addLectureNote = (req, res, next) => {
  const { cid, lid } = req.params;
  const { title } = req.body;
  Classroom.findById(cid).then((classroom) => {
    if (!classroom)
      return res.status(404).json(response(false, "Classroom not found", null));
    Lecture.findById(lid)
      .then((lec) => {
        // File Upload
        uploadFile(req.file, "documents")
          .then((fileRes) => {
            lec.notes.push({
              title,
              key: fileRes.Key,
              url: fileRes.Location,
            });
            lec
              .save()
              .then((slec) => res.json(response(true, "Note added.", slec)))
              .catch((err) => next(err));
          })
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });
};

exports.delLectureNote = (req, res, next) => {
  const { cid, lid, noteId } = req.params;
  Classroom.findById(cid)
    .then((croom) => {
      if (!croom)
        return res
          .status(404)
          .json({ msg: "Classroom not found (Maybe deleted)" });
      Lecture.findById(lid)
        .then((lecture) => {
          // TODO: DELETE NOTE FILES
          const note = lecture.notes.find((n) => n.id == noteId);
          deleteFile(note.key)
            .then(() => {
              console.log("Note deleted successfully!!");
              lecture.notes = lecture.notes.filter((n) => n.id != note.id);
              lecture
                .save()
                .then((savedLec) => res.json(savedLec))
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// ANNOUNCEMENT CONTROLLER FUNCTIONS

exports.addAnnouncement = (req, res, next) => {
  const { cid } = req.params;
  const { title, description, links } = req.body;
  // console.log(req.files);
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom)
        return res.status(404).json({ msg: "Classroom not found" });
      const fileUploadPromises = [];
      for (let file of req.files) {
        fileUploadPromises.push(uploadFile(file, "documents"));
      }
      Promise.allSettled(fileUploadPromises)
        .then((result) => {
          // console.log(result);
          let attachments = [];
          for (let i = 0; i < result.length; i++) {
            attachments.push({
              name: req.files[i].originalname,
              key: result[i].value.Key,
              url: result[i].value.Location,
            });
          }
          Announcement.create({
            title,
            description,
            attachments,
            links: JSON.parse(links),
          })
            .then((ann) => {
              console.log(ann);
              classroom.announcements.push(ann);
              classroom
                .save()
                .then((_) => res.json(ann))
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => {
          console.log("Bul File Upload Failed: ", err);
          return next(err);
        });
    })
    .catch((err) => next(err));
};

exports.delAnnouncement = (req, res, next) => {
  const { cid, aid } = req.params;
  Classroom.findById(cid)
    .then((classroom) => {
      if (!classroom)
        return res.status(404).status({ msg: "Classroom not found" });
      Announcement.findById(aid)
        .then((ann) => {
          let promises = [];
          ann.attachments.forEach((attach) =>
            promises.push(deleteFile(attach.key))
          );
          Promise.allSettled(promises)
            .then((_) => {
              ann
                .remove()
                .then((delAnn) => {
                  classroom.announcements = classroom.announcements.filter(
                    (an) => an.id != delAnn.id
                  );
                  classroom
                    .save()
                    .then((_) => res.json(delAnn))
                    .catch((err) => next(err));
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.addCommentToAnnouncement = (req, res, next) => {
  const { aid } = req.params;
  const { comment } = req.body;
  User.findById(req.userId)
    .select("name dp")
    .then((User) => {
      Announcement.findById(aid)
        .then((ann) => {
          if (!ann)
            return res.status(404).json({ msg: "Announcement not found" });
          ann.comments.push({
            comment,
            author: { id: req.userId, name: User.name, dp: User.dp },
          });
          ann
            .save()
            .then((savedAnn) => res.json(savedAnn))
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.delCommentfromAnnouncement = (req, res, next) => {
  const { aid, commentId } = req.params;
  Announcement.findById(aid)
    .then((ann) => {
      // console.log(commentId)
      // console.log(req.userId)
      // console.log(ann.comments);
      // TODO: IMPLEMENT CHECKING OF USER ID IF POSSIBLE
      ann.comments = ann.comments.filter((comment) => comment.id != commentId);
      // console.log(ann.comments);
      ann
        .save()
        .then((savedAnn) => res.json(savedAnn.comments))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.getAnnouncement = (req, res, next) => {
  Announcement.findById(req.params.aid)
    .then((ann) => {
      res.json(ann);
    })
    .catch((err) => next(err));
};

exports.deleteClassroom = (req, res, next) => {
  const { cid } = req.params;
  const { password } = req.query;
  Classroom.findById(cid)
  .then((classroom) => {
      if (!classroom)
        return res
          .status(404)
          .json(response(false, "Classroom not found.", null));
      if (classroom.teacherPassword != password)
        return res
          .status(403)
          .json(response(false, "Classroom Password Incorrect", null));
      if (
        classroom.lectures.length > 0 ||
        classroom.students.length > 0 ||
        classroom.faculties.length > 1
      ) {
        return res
          .status(400)
          .json(
            response(
              false,
              "Classroom can be removed only if it has 0 Lectures and 0 Members(exlcuding Head)",
              null
            )
          );
      }

      classroom
        .remove()
        .then((delClass) =>
          User.findById(req.userId)
            .then((user) => {
              user.teacherClassrooms = user.teacherClassrooms.filter(
                (fc) => fc != delClass.id
              );
              user
                .save()
                .then((_) =>
                  res.json(
                    response(true, "Classroom Deleted Successfully.", delClass)
                  )
                )
                .catch((err) => next(err));
            })
            .catch((err) => next(err))
        )
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

// CLASSROOM SETTINGS

exports.changeHead = (req, res, next) => {
  const { teacherId } = req.body;
  const { cid } = req.params;
  Classroom.findById(cid)
    .then((classroom) => {
      if (req.userId != classroom.head.id)
        return res
          .status(403)
          .json(response(false, "Only Head can update", null));
      if (!classroom.faculties.includes(teacherId))
        return res.status(400).json(response(false, "Invalid Candidate", null));
      User.findById(teacherId)
        .select("name email")
        .then((user) => {
          classroom.head = {
            name: user.name,
            email: user.email,
            id: teacherId,
          };
          // TODO: Send Mails to The Faculty upgraded to Head
          classroom
            .save()
            .then((savedClass) =>
              res.json(
                response(
                  true,
                  "Classroom Head Updated. You no longer have head rights.",
                  savedClass.head
                )
              )
            )
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.removeStudent = (req, res, next) => {
  const { cid } = req.params;
  const { sid } = req.body; //Student Id
  User.findById(req.userId)
    .then((user) => {
      Classroom.findById(cid)
        .then((classroom) => {
          // HEAD CHECK
          if (user.id !== classroom.head.id)
            return res
              .status(403)
              .json(
                response(
                  false,
                  "You do not have rights for this operation.",
                  null
                )
              );
          classroom.students = classroom.students.filter((stud) => stud != sid);
          classroom
            .save()
            .then((savedClass) => {
              // Removing the classroom from the student
              User.findById(sid).then((student) => {
                student.studentClassrooms = student.studentClassrooms.filter(
                  (studentClassroom) => studentClassroom != savedClass.id
                );
                student
                  .save()
                  .then((_) =>
                    res.json(response(true, "Student Removed.", student.id))
                  )
                  .catch((err) => next(err));
              });
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.removeTeacher = (req, res, next) => {
  const { cid } = req.params;
  const { fid } = req.body; //Faculty Id
  User.findById(req.userId)
    .then((user) => {
      Classroom.findById(cid)
        .then((classroom) => {
          // HEAD CHECK
          if (user.id !== classroom.head.id)
            return res
              .status(403)
              .json(
                response(
                  false,
                  "You do not have rights for this operation.",
                  null
                )
              );
          if (fid === user.id)
            return res
              .status(400)
              .json(
                response(
                  false,
                  "Head of the classroom cannot be removed.",
                  false
                )
              );
          classroom.faculties = classroom.faculties.filter((fac) => fac != fid);
          classroom
            .save()
            .then((savedClass) => {
              User.findById(fid)
                .then((faculty) => {
                  faculty.teacherClassrooms = faculty.teacherClassrooms.filter(
                    (facultyClassroom) => facultyClassroom != savedClass.id
                  );
                  faculty
                    .save()
                    .then((_) =>
                      res.json(response(true, "Teacher Removed.", faculty.id))
                    )
                    .catch((err) => next(err));
                })
                .catch((err) => next(err));
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.getClassPass = (req, res, next) => {
  Classroom.findById(req.params.cid)
    .select("name code teacherPassword")
    .then((classroom) => {
      User.findById(req.userId)
        .select("email")
        .then((user) => {
          sendMail(
            user.email,
            "",
            "",
            "Requested Classroom Data",
            getClassroomPassword(
              classroom.name,
              classroom.code,
              classroom.teacherPassword
            )
          )
            .then((result) => {
              res.json(
                response(true, "Password sent to your registered email.", null)
              );
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
