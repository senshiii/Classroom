const jwt = require("jsonwebtoken");
const Classroom = require("../models/Classroom");

exports.validateToken = (req, res, next) => {
  let authToken = null;
  const { token } = req.query;
  const authHeader = req.headers["authorization"]; // BEARER {TOKEN}
  // console.log("Authrization header", authHeader);
  if (authHeader) authToken = authHeader.split(" ")[1];
  else if (token) authToken = token;

  if (!authToken)
    return res
      .status(401)
      .json({ msg: "You should be logged in to continue." });
  // console.log("JWT TOKEN", token);
  jwt.verify(authToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return next(err);
    // console.log(payload);
    req.userId = payload.id;
    next();
  });
};

exports.isMember = (req, res, next) => {
  const { cid } = req.params;
  const { code } = req.query;
  let searchObj = {};
  if (cid) searchObj["_id"] = cid;
  else if (code) searchObj["code"] = code;
  else {
    return res.status(400).json({ msg: "Classroom identitfier missing" });
  }
  // console.log(cid, code, searchObj);
  Classroom.findOne(searchObj)
    .select("students faculties")
    .exec()
    .then((classroom) => {
      if (!classroom)
        return res.status(404).json({ msg: "Classroom could not be found.." });

      if (
        classroom.students.includes(req.userId) ||
        classroom.faculties.includes(req.userId)
      ) {
        next();
      } else {
        res.status(403).json({
          msg: "Classroom data is accessible by subscribed members only",
        });
      }
    })
    .catch((err) => next(err));
};

exports.isStudent = (req, res, next) => {
  const { cid } = req.params;
  const { code } = req.query;
  let searchObj = {};
  if (cid) searchObj["_id"] = cid;
  else if (code) searchObj["code"] = code;
  else {
    return res.status(400).json({ msg: "Classroom identitfier missing" });
  }
  // console.log(cid, code, searchObj);
  Classroom.findOne(searchObj)
    .select("students")
    .exec()
    .then((classroom) => {
      if (!classroom)
        return res.status(404).json({ msg: "Classroom could not be found.." });

      if (classroom.students.includes(req.userId)) {
        next();
      } else {
        res.status(403).json({
          msg: "Classroom data is accessible by subscribed members only",
        });
      }
    })
    .catch((err) => next(err));
};

exports.isFaculty = (req, res, next) => {
  const { cid } = req.params;
  const { code } = req.query;
  let searchObj = {};
  if (cid) searchObj["_id"] = cid;
  else if (code) searchObj["code"] = code;
  else {
    return res
      .status(400)
      .json(response(false, "Classroom could not be found..", null));
  }
  // console.log(cid, code, searchObj);
  Classroom.findOne(searchObj)
    .select("faculties")
    .exec()
    .then((classroom) => {
      if (!classroom)
        return res
          .status(404)
          .json(response(false, "Classroom could not be found..", null));

      if (classroom.faculties.includes(req.userId)) {
        next();
      } else {
        res.status(403).json({
          msg: "Classroom data is accessible by subscribed members only",
        });
      }
    })
    .catch((err) => next(err));
};

exports.isHead = (req, res, next) => {
  const { cid } = req.params;
  const { code } = req.query;
  let searchObj = {};
  if (cid) searchObj["_id"] = cid;
  else if (code) searchObj["code"] = code;
  else {
    return res
      .status(400)
      .json(response(false, "Classroom Identifier Missing.", null));
  }
  Classroom.findOne(searchObj)
    .then((classroom) => {
      if (classroom.head.id === req.userId) next();
      else
        return res
          .status(403)
          .json(response(false, "Unauthorized action not allowed.", null));
    })
    .catch((err) => next(err));
};
