const aws = require("aws-sdk");
const fs = require("fs");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

exports.uploadFile = (file, keyPath) =>
  new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(file.path);
    s3.upload(
      {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${keyPath}/${file.filename}`,
        Body: fileContent,
        ACL: "public-read",
        ContentType: file.mimetype,
        ContentLength: file.size,
      },
      (err, upResult) => {
        if (err) {
          console.log("Error Uploading to S3: ", err);
          return reject(err);
        } else {
          fs.unlinkSync(file.path);
          return resolve(upResult);
        }
      }
    );
  });

exports.deleteFile = (key) =>
  new Promise((resolve, reject) => {
    s3.deleteObject(
      { Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key },
      (err, data) => {
        if (err) {
          console.log("Error Deleting File from S3", err);
          return reject(err);
        } else {
          return resolve(data);
        }
      }
    );
  });

exports.s3 = s3;
