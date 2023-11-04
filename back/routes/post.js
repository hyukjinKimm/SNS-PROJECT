const express = require("express");
const multer = require("multer");
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

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
});

router.post("/", isLoggedIn, upload.single("images"), uploadPost);
router.post("/", isLoggedIn, upload.single("images"), uploadPost);
router.post("/:postId/like", isLoggedIn, likePost);
router.post("/:postId/unlike", isLoggedIn, unlikePost);
router.post("/:postId/comment", isLoggedIn, commentPost);
router.delete("/:postId", isLoggedIn, deletePost);
router.delete("/:postId/comment/:commentId", isLoggedIn, deleteComment);
module.exports = router;
