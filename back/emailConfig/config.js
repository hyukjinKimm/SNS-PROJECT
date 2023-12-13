const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();

exports.smtpTransport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE, // mail 서비스명 ex) 'Naver', 'gmail' 등
  maxConnections: 1,
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.SMTP_USER, // mail 발송 이메일 주소
    pass: process.env.SMTP_PASSWORD, // 해당 이메일 비밀번호
  },
  tls: {
    rejectUnauthorized: false,
  },
});
