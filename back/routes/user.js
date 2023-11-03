const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { getUser, joinUser } = require("../controllers/user");
const { likeComment, unLikeComment } = require("../controllers/comment");
const router = express.Router();
router.get("/", getUser);
router.post("/", isNotLoggedIn, joinUser);
router.patch("/likecomment", isLoggedIn, likeComment);
router.patch("/unlikecomment", isLoggedIn, unLikeComment);
module.exports = router;
