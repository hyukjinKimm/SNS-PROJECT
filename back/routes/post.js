const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  uploadPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  deleteComment,
} = require("../controllers/post");
const router = express.Router();

router.post("/", isLoggedIn, uploadPost);

router.post("/:postId/like", isLoggedIn, likePost);
router.post("/:postId/unlike", isLoggedIn, unlikePost);
router.post("/:postId/comment", isLoggedIn, commentPost);
router.delete("/:postId", isLoggedIn, deletePost);
router.delete("/:postId/comment/:commentId", isLoggedIn, deleteComment);
module.exports = router;
