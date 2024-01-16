const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");
const { download } = require("../middlewares");
module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: "kakao" },
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const sameUser = await User.findOne({
              // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
              where: { email: profile._json?.kakao_account?.email },
            });
            if (sameUser) {
              return done(null, false, {
                message: " 이미 사용중인 이메일입니다..",
              });
            }
            const src = "_" + Date.now() + ".png";
            download(
              profile._json.properties.profile_image,
              "./uploads/" + src,
              function () {
                console.log("done");
              }
            );
            const sameNicknameUser = await User.findOne({
              // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
              where: { nickname: profile.displayName },
            });
            if (sameNicknameUser) {
              const newUser = await User.create({
                email: profile._json?.kakao_account?.email,
                nickname: "기본닉네임_" + Date.now(),
                snsId: profile.id,
                provider: "kakao",
                src: src ? src : "default_male.png",
                gender: "male",
              });
              done(null, newUser);
            } else {
              const newUser = await User.create({
                email: profile._json?.kakao_account?.email,
                nickname: profile.displayName,
                snsId: profile.id,
                provider: "kakao",
                src: src ? src : "default_male.png",
                gender: "male",
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
