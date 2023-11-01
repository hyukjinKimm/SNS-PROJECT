const express = require("express");
const { sequelize } = require("../models");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.uploadPost = async (req, res, next) => {
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
};

exports.likePost = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        // like 한 post 가 없음

        await user.addLikings(parseInt(req.params.postId, 10));
        const postWithLikers = await Post.findOne({
          where: { id: req.params.postId },
          include: {
            model: User,
            attributes: ["id"],
            as: "Likers",
          },
        });

        res.status(200).json(postWithLikers);
      } else {
        res.status(404).send("존재하지 않는 포스트 입니다.");
      }
    } else {
      res.status(404).send("존재하지 않는 유저 입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unlikePost = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        // like 한 post 가 없음
        await sequelize.models.Like.destroy({
          where: { UserId: req.user.id, PostId: req.params.postId },
        });
        const postWithLikers = await Post.findOne({
          where: { id: req.params.postId },
          include: {
            model: User,
            attributes: ["id"],
            as: "Likers",
          },
        });
        res.status(200).json(postWithLikers);
      } else {
        res.status(404).send("존재하지 않는 포스트 입니다.");
      }
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.commentPost = async (req, res, next) => {
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
};

exports.deletePost = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        // like 한 post 가 없음
        if (req.user.id == post.UserId) {
          await post.destroy({
            where: { id: parseInt(req.params.postId, 10) },
          });
          res.status(201).json({
            id: req.params.postId,
            message: "delete success",
          });
        } else {
          res.send("not your post");
        }
      } else {
        res.status(404).send("no post");
      }
    } else {
      res.status(404).send("존재하지 않는 유저입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};