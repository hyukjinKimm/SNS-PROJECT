const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  getMyInfo,
  joinUser,
  getUser,
  follow,
  unfollow,
} = require("../controllers/user");
const { likeComment, unLikeComment } = require("../controllers/comment");
const router = express.Router();
router.get("/", getMyInfo);
router.get("/:nickname", getUser);
router.post("/", isNotLoggedIn, joinUser);
router.patch("/likecomment", isLoggedIn, likeComment);
router.patch("/unlikecomment", isLoggedIn, unLikeComment);
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);
module.exports = router;
