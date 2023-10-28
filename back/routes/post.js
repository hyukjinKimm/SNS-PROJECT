const express = require("express");

const User = require("../models/user");
const Post = require("../models/post");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const router = express.Router();

router.post("/", isLoggedIn, async (req, res, next) => {
  try {
    await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    const post = await Post.findOne({
      where: { UserId: req.user.id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    console.log(post);

    res.status(200).json(post);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
});
module.exports = router;
