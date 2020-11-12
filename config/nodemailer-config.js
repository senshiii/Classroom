const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URL
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

exports.sendMail = async (to, bcc, cc, subject, body) => {
  const accessTokenResponse = await oauth2Client.getAccessToken();
  const token = accessTokenResponse.token;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "mail.homeroom@gmail.com",
      clientId: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: token,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: "mail.homeroom@gmail.com",
    to,
    bcc,
    cc,
    subject,
    html: body,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, response) => {
      if (err) return reject(err);
      transporter.close();
      return resolve(response);
    });
  });
};
