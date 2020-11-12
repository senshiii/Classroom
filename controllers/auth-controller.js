const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const response = require("../utils/response");
const { sendMail } = require("../config/nodemailer-config");

exports.register = (req, res, next) => {
  const { name, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user)
        return res
          .status(400)
          .json(response(false, "User already exists. Login instead.", null));
      bcrypt
        .hash(password, 16)
        .then((hash) => {
          User.create({ name, email, password: hash })
            .then((User) => {
              jwt.sign(
                { id: User.id },
                process.env.ACCESS_TOKEN_SECRET,
                (err, token) => {
                  if (err) {
                    console.log("Error signing jwt token", err);
                    return next(err);
                  }
                  sendMail(
                    email,
                    "",
                    "",
                    "Welcome to Homeroom 🎉",
                    
                  );
                  res.json({ token, id: User.id });
                }
              );
            })
            .catch((err) => next(err));
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(404)
        .json(response(false, "Incorrect credentials", null));
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          (err, token) => {
            if (err) {
              console.log("Error signing token", err);
              next(err);
            }
            res.json({ token, id: user.id });
          }
        );
      } else
        res.status(400).json(response(false, "Incorrect credentials", null));
    });
  });
};



