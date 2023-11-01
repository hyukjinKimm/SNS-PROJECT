const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  uploadPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
} = require("../controllers/post");
const router = express.Router();

router.post("/", isLoggedIn, uploadPost);

router.post("/:postId/like", isLoggedIn, likePost);
router.post("/:postId/unlike", isLoggedIn, unlikePost);
router.post("/:postId/comment", isLoggedIn, commentPost);
router.delete("/:postId", isLoggedIn, deletePost);
module.exports = router;
