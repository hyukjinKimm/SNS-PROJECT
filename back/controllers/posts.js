const express = require("express");
const { Op } = require("sequelize");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Image = require("../models/image");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.getPosts = async (req, res, next) => {
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
        {
          model: User,

          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweetings",
          attributes: ["id"],
        },
      ],
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
    });

    res.status(200).json(posts);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};
