const express = require("express");
const bcypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const Image = require("../models/image");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { smtpTransport } = require("../emailConfig/config");
const dotenv = require("dotenv");
dotenv.config();
exports.logIn = async (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      // 서버 에러
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(403).send(info.message); //
    }
    return req.login(user, async (loginError) => {
      try {
        if (loginError) {
          console.error(loginError);
          return next(loginError);
        }
        const fullUserWithOutPassword = await User.findOne({
          where: { id: user.id },
          include: [
            {
              model: Post,
              include: [
                {
                  model: Image,
                },
              ],
            },
            {
              model: User,
              as: "Followings",
            },
            {
              model: User,
              as: "Followers",
            },
          ],
          attributes: { exclude: ["password"] },
        });
        return res.status(200).json(fullUserWithOutPassword);
      } catch (err) {
        console.error(err);
        next(err);
      }
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

exports.logOut = (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
};
exports.emailAuth = async (req, res) => {
  const number = Math.floor(Math.random() * 888888) + 111111;

  const { email } = req.body; //사용자가 입력한 이메일
  const mailOptions = {
    from: process.env.SMTP_USER, // 발신자 이메일 주소.
    to: email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
    subject: " 인증 관련 메일 입니다. ",
    html: "<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>" + number,
  };
  smtpTransport.sendMail(mailOptions, (err, response) => {
    //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
    if (err) {
      res.json({ ok: false, msg: " 메일 전송에 실패하였습니다. " });
      smtpTransport.close(); //전송종료
      return;
    } else {
      res.json({
        ok: true,
        msg: " 메일 전송에 성공하였습니다. ",
      });
      smtpTransport.close(); //전송종료
      return;
    }
  });
};
