const express = require("express");
const passport = require("passport");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { logIn, logOut } = require("../controllers/auth");
const router = express.Router();

router.post("/login", isNotLoggedIn, logIn);
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/?error=카카오로그인 실패",
  }),
  (req, res) => {
    res.redirect("http://localhost:3060/"); // 성공 시에는 /로 이동
  }
);

router.get("/logout", isLoggedIn, logOut);

module.exports = router;
