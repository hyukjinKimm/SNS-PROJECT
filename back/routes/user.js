const express = require("express");
const bcypt = require("bcrypt");
const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        return res.status(403).send("존재하지 않는 유저 입니다.");
      }
      res.status(200).json(user);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
});
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, password, nickname, gender } = req.body;
    const exUser = await User.findOne({
      where: { email },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 email 입니다.");
    }

    const hashPassword = await bcypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashPassword,
      nickname,
      gender,
    });
    res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
});
module.exports = router;
