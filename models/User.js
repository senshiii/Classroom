const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    dp: {
      type: Object,
      default: { key: "", url: "" },
    },
    password: {
      type: String,
      required: true,
    },
    studentClassrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
      },
    ],
    teacherClassrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Classroom",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
