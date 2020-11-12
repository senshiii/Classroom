const mongoose = require("mongoose");

const AnnSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attachments: [
      {
        name: String,
        key: String,
        url: String,
      },
    ],
    links: [
      {
        title: String,
        link: String,
      },
    ],
    comments: [
      {
        author: {
          name: String,
          id: String,
          dp: Object,
        },
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", AnnSchema);
