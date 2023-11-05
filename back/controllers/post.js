const express = require("express");
const { sequelize } = require("../models");
const sharp = require("sharp");
const fs = require("fs");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Image = require("../models/image");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");

exports.uploadImage = (req, res, next) => {
  try {
    sharp(req.file.path) // 압축할 이미지 경로
      .resize({ width: 200, height: 200 }) // 비율을 유지하며 가로 세로 크기 줄이기
      .withMetadata() // 이미지의 exif데이터 유지
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장(덮어씌우기)
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });
    res.json({
      imagePath: req.file.filename,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.uploadPost = async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    if (req.body.image) {
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(
          req.body.image.map((image) => Image.create({ src: image }))
        );
        await post.addImages(images);
      } else {
        const image = await Image.create({ src: req.body.image });
        await post.addImages(image);
      }
    }

    const fullPost = await Post.findOne({
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
        {
          model: Image,
        },
      ],
    });
    console.log(fullPost);

    res.status(200).json(fullPost);
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
