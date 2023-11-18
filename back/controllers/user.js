const express = require("express");
const bcypt = require("bcrypt");
const User = require("../models/user");
const Post = require("../models/post");
const Image = require("../models/image");
const { sequelize } = require("../models");
const sharp = require("sharp");
const fs = require("fs");
exports.getMyInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Post,
            include: [{ model: Image }],
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
        joinTableAttributes: [],
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
};
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { nickname: decodeURIComponent(req.params.nickname) },
      include: [
        {
          model: Post,
          include: [{ model: Image }],
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
      order: [[Post, "createdAt", "DESC"]],
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 유저 입니다.");
    }
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.joinUser = async (req, res, next) => {
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
      src: gender == "male" ? "default_male.png" : "default_female.jpg",
    });
    res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.follow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      await user.addFollowing(parseInt(req.params.id, 10));
      res.json({
        id: parseInt(req.params.id),
        message: "follow success",
      });
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.unfollow = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      // req.user.id가 followerId, req.params.id가 followingId
      await sequelize.models.Follow.destroy({
        where: { FollowerId: req.user.id, FollowId: req.params.id },
      });
      return res.json({
        id: parseInt(req.params.id),
        message: "unFollow success",
      });
    } else {
      res.status(404).send("no user");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

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
