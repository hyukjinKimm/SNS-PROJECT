const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Image = require("../models/image");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId, 10)) {
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: { exclude: ["password"] },
            },
          ],
        },
        {
          model: Image,
        },
      ],

      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
    });
    console.log(posts);

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
});

module.exports = router;
