const express = require("express");
const { sequelize } = require("../models");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Image = require("../models/image");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.uploadImage = async (req, res, next) => {
  try {
    console.log(req.file);
    res.send("ok");
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.uploadImages = async (req, res, next) => {
  try {
    console.log(req.files);
    res.send("ok");
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.uploadPost = async (req, res, next) => {
  try {
    console.log("hi", req.images);
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
        {
          model: Comment,
          include: [
            {
              model: User,
              as: "CommentLikers",
              attributes: { exclude: ["password"] },
            },
          ],
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

        await user.addPostLikings(parseInt(req.params.postId, 10));
        const postWithLikers = await Post.findOne({
          where: { id: req.params.postId },
          include: {
            model: User,
            attributes: ["id"],
            as: "PostLikers",
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
        await sequelize.models.UserLikePost.destroy({
          where: { UserId: req.user.id, PostId: req.params.postId },
        });
        const postWithLikers = await Post.findOne({
          where: { id: req.params.postId },
          include: {
            model: User,
            attributes: ["id"],
            as: "PostLikers",
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
        {
          model: User,
          as: "CommentLikers",
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

exports.deletePost = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      const post = await Post.findOne({ where: { id: req.params.postId } });
      if (post) {
        // like 한 post 가 없음
        if (req.user.id == post.UserId) {
          await Post.destroy({
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

exports.deleteComment = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });

    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
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
