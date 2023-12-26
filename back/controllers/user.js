const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Post = require("../models/post");
const Image = require("../models/image");
const Comment = require("../models/comment");
const { sequelize } = require("../models");
const { Op } = require("sequelize");
const sharp = require("sharp");
const fs = require("fs");
exports.emailExistCheck = async (req, res, next) => {
  try {
    const { email } = req.body;
    const exUser = await User.findOne({
      where: { email },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 email 입니다.");
    }
    res.status(200).json({
      code: 200,
      message: "사용가능한 email 입니다.",
    });
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};
exports.nicknameExistCheck = async (req, res, next) => {
  try {
    const { nickname } = req.body;
    const exUser = await User.findOne({
      where: { nickname },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 nickname 입니다.");
    }
    res.status(200).json({
      code: 200,
      message: "사용가능한 nickname 입니다.",
    });
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};
exports.getMyInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: [
          {
            model: Post,
            attributes: ["id"],
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
      console.log(user);
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
          attributes: ["id"],
        },

        {
          model: User,
          as: "Followings",
          attributes: ["id", "src", "description", "nickname"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id", "src", "description", "nickname"],
        },
      ],
      attributes: { exclude: ["password"] },
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
    const { email, password, nickname, gender, birth } = req.body;
    const exUser = await User.findOne({
      where: { email },
    });
    if (exUser) {
      return res.status(403).send("이미 사용중인 email 입니다.");
    }
    const sameNicknameUser = await User.findOne({
      where: { nickname },
    });

    if (sameNicknameUser) {
      return res.status(403).send("이미 사용중인 nickname 입니다.");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      email,
      password: hashPassword,
      nickname,
      gender,
      src: gender == "female" ? "default_female.jpg" : "default_male.png",
      birth: birth ? birth : null,
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

exports.profileEdit = async (req, res, next) => {
  try {
    if (req.user) {
      const updataData = {};
      if (req.body.nickname) {
        const user = await User.findOne({
          where: { nickname: req.body.nickname },
        });
        if (user) {
          return res.status(403).send("이미 존재하는 닉네임 입니다");
        }
        updataData.nickname = req.body.nickname;
      }
      if (req.body.description) {
        updataData.description = req.body.description;
      }
      if (req.body.src) {
        updataData.src = req.body.src;
      }

      const user = await User.update(updataData, {
        where: { id: req.user.id },
      });
      res.status(200).json(user);
    } else {
      res.status(402).send("로그인 필요");
    }
    res.status(200).send("ok");
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};
exports.passwordReset = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const exUser = await User.findOne({
      where: { email },
    });
    if (!exUser) {
      return res.status(403).send("존재하지 않는 email 입니다.");
    }
    const hashPassword = await bcrypt.hash(password, 12);
    const updataData = {};
    updataData.password = hashPassword;
    if (exUser.provider != "local") {
      updataData.provider = "local";
    }
    const newUser = await User.update(updataData, {
      where: { email: email },
    });
    res.status(200).send("업데이트 완료");
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.signOut = async (req, res, next) => {
  try {
    const { email, password, social } = req.body;
    console.log(email, password, social);
    const exUser = await User.findOne({
      where: { email },
    });
    if (!exUser || exUser.email != req.user.email) {
      return res.status(403).send("유효하지 않은 이메일 입니다.");
    }
    if (exUser.provider != "local" && !social) {
      return res.status(403).send("체크박스를 선택해 주세요");
    }
    if (exUser.provider == "local" && social) {
      return res
        .status(403)
        .send("체크박스를 해제하고 비밀번호를 제대로 입력해 주세요");
    }

    if (!social) {
      const result = await bcrypt.compare(password, exUser.password);
      if (result) {
        await User.destroy({ where: { id: req.user.id }, force: true });
        return res.status(200).send("회원탈퇴 완료.");
      } else {
        return res.status(403).send("비밀번호가 틀립니다.");
      }
    } else {
      await User.destroy({ where: { id: req.user.id }, force: true });
      return res.status(200).send("회원탈퇴 완료.");
    }
  } catch (e) {
    console.error(e);
    next(e); // status(500)
  }
};

exports.searchUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { nickname: decodeURIComponent(req.body.nickname) },
      attributes: { exclude: ["password"] },
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
