const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const sendEmail = (template, to, subject) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    // service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },

    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `Supa Deals <${process.env.MAIL_FROM}>`,
    to,
    subject,
    html: template,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return error;
    } else {
      return "Email sent";
    }
  });
};

module.exports = sendEmail;
