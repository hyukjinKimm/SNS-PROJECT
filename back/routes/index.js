const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
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

router.get("/", (req, res, next) => {
  res.send("index page");
});
router.post("/", upload.array("image"), (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  res.send("index page");
});
module.exports = router;
