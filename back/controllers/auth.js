const express = require("express");
const bcypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

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
