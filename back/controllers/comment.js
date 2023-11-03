const express = require("express");
const { sequelize } = require("../models");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.updateComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
        });
        if (comment) {
          if (req.user.id == comment.UserId) {
            await Comment.update({
              content: req.body.content,
              where: { id: parseInt(req.params.commentId, 10) },
            });
            res.status(201).json({
              postId: req.params.postId,
              commentId: req.params.commentId,
              message: "comment  success",
            });
          } else {
            res.send("not your comment");
          }
        } else {
          res.send("no comment");
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

exports.deleteComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        const comment = await Comment.findOne({
          where: { id: req.params.commentId },
        });
        if (comment) {
          if (req.user.id == comment.UserId) {
            await Comment.destroy({
              where: { id: parseInt(req.params.commentId, 10) },
            });
            res.status(201).json({
              postId: req.params.postId,
              commentId: req.params.commentId,
              message: "comment delete success",
            });
          } else {
            res.send("not your comment");
          }
        } else {
          res.send("no comment");
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

exports.likeComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      const post = await Post.findOne({ where: { id: req.body.postId } });
      if (post) {
        const comment = await Comment.findOne({
          where: { id: req.nody.commentId },
        });
        if (comment) {
          await sequelize.models.UserLikeComment.create({
            UserId: req.user.id,
            CommentId: req.body.commentId,
          });

          const CommentLikers = await sequelize.models.UserLikeComment.findAll({
            where: { commentId: req.body.commentId },
            attribute: ["UserId"],
          });
          res.status(201).json({
            postId: req.body.postId,
            commentId: req.body.commentId,
            userId: req.user.id,
            CommentLikers,
            message: "like comment success",
          });
        } else {
          res.send("no comment");
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
