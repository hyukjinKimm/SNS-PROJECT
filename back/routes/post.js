const express = require("express");

const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
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
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send("존재하지 않는 포스트 입니다.");
    }

    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    const commentWithUser = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json(commentWithUser);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
});
module.exports = router;
