const passport = require("passport");
const {
  Strategy: NaverStrategy,
  Profile: NaverProfile,
} = require("passport-naver-v2");
const fs = require("fs");
const request = require("request");
const User = require("../models/user");
const { download } = require("../middlewares");
module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("naver profile : ", profile);
        try {
          const exUser = await User.findOne({
            // 네이버 플랫폼에서 로그인 했고 & snsId필드에 네이버 아이디가 일치할경우
            where: { snsId: profile.id, provider: "naver" },
          });
          // 이미 가입된 네이버 프로필이면 성공
          if (exUser) {
            done(null, exUser);
          } else {
            // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
            const src = "_" + Date.now() + ".png";
            download(profile.profileImage, "./uploads/" + src, function () {
              console.log("done");
            });

            const sameNicknameUser = await User.findOne({
              // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
              where: { nickname: profile.nickname },
            });
            if (sameNicknameUser) {
              const newUser = await User.create({
                email: profile.email,
                nickname: "기본닉네임_" + Date.now(),
                snsId: profile.id,
                provider: "naver",
                src: src ? src : "default_male.png",
                gender: profile.gender == "M" ? "male" : "female",
              });
              done(null, newUser);
            } else {
              const newUser = await User.create({
                email: profile.email,
                nickname: profile.nickname,
                snsId: profile.id,
                provider: "naver",
                src: src ? src : "default_male.png",
                gender: profile.gender == "M" ? "male" : "female",
              });
              done(null, newUser);
            }
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
