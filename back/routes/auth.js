const express = require("express");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn, verifyToken } = require("../middlewares");
const {
  logIn,
  logOut,
  emailAuth,
  emailVarification,
} = require("../controllers/auth");
const router = express.Router();

router.post("/login", isNotLoggedIn, logIn);
router.get("/kakao", passport.authenticate("kakao"));

// GET /auth/kakao/callback
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "http://wexplore.shop/login?error=kakao",
  }),
  (req, res) => {
    res.redirect("http://wexplore.shop/"); // 성공 시에는 /로 이동
  }
);
router.get("/naver", passport.authenticate("naver", { authType: "reprompt" }));

// GET /auth/kakao/callback
router.get(
  "/naver/callback",
  passport.authenticate("naver", {
    failureRedirect: "http://wexplore.shop/login?error=naver",
  }),
  (req, res) => {
    res.redirect("http://wexplore.shop/"); // 성공 시에는 /로 이동
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://wexplore.shop/login?error=google",
  }), //? 그리고 passport 로그인 전략에 의해 googleStrategy로 가서 구글계정 정보와 DB를 비교해서 회원가입시키거나 로그인 처리하게 한다.
  (req, res) => {
    res.redirect("http://wexplore.shop/");
  }
);
router.post("/emailCheck", emailAuth);
router.post("/emailVarification", verifyToken, emailVarification);
router.get("/logout", isLoggedIn, logOut);

module.exports = router;
