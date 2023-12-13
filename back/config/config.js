const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "sns-project",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "sns-project",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "sns-project",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
