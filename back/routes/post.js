const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  uploadPost,
  likePost,
  unlikePost,
  commentPost,
  deletePost,
  deleteComment,
  uploadImages,
  uploadImage,
} = require("../controllers/post");
const router = express.Router();
try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("uploads");
}
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
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});
router.post("/image", isLoggedIn, upload.single("images"), uploadImage);
router.post("/images", isLoggedIn, upload.array("images"), uploadImages);
router.post("/", isLoggedIn, uploadPost);
router.post("/:postId/like", isLoggedIn, likePost);
router.post("/:postId/unlike", isLoggedIn, unlikePost);
router.post("/:postId/comment", isLoggedIn, commentPost);
router.delete("/:postId", isLoggedIn, deletePost);
router.delete("/:postId/comment/:commentId", isLoggedIn, deleteComment);
module.exports = router;
