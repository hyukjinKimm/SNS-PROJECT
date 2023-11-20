const express = require("express");
const multer = require("multer");
const path = require("path");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const {
  getMyInfo,
  joinUser,
  getUser,
  follow,
  unfollow,
  uploadImage,
  profileEdit,
} = require("../controllers/user");
const { likeComment, unLikeComment } = require("../controllers/comment");
const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + "_" + Date.now() + ext);
    },
  }),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});
router.get("/", getMyInfo);
router.post("/image", isLoggedIn, upload.single("image"), uploadImage);
router.post("/edit", isLoggedIn, profileEdit);
router.get("/:nickname", getUser);
router.post("/", isNotLoggedIn, joinUser);
router.patch("/likecomment", isLoggedIn, likeComment);
router.patch("/unlikecomment", isLoggedIn, unLikeComment);
router.post("/:id/follow", isLoggedIn, follow);
router.post("/:id/unfollow", isLoggedIn, unfollow);
module.exports = router;
