const mongoose = require("mongoose");

const lectureSchema = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    notes: [
      {
        title: String,
        key: String,
        url: String,
        date: {
          type: "String",
          default: new Date(Date.now()).toLocaleDateString(),
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
