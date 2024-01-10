const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");
const { download } = require("../middlewares");
module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // 구글 로그인에서 발급받은 REST API 키
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback", // 구글 로그인 Redirect URI 경로
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("google profile : ", profile);
        try {
          const exUser = await User.findOne({
            // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
            where: { snsId: profile.id, provider: "google" },
          });
          // 이미 가입된 구글 프로필이면 성공
          if (exUser) {
            done(null, exUser); // 로그인 인증 완료
          } else {
            const sameUser = await User.findOne({
              // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
              where: { email: profile?.emails[0].value },
            });
            if (sameUser) {
              return done(null, false, {
                message: " 이미 사용중인 이메일입니다..",
              });
            }
            const src = "_" + Date.now() + ".png";
            download(profile.photos[0].value, "./uploads/" + src, function () {
              console.log("done");
            });
            const sameNicknameUser = await User.findOne({
              // 구글 플랫폼에서 로그인 했고 & snsId필드에 구글 아이디가 일치할경우
              where: { nickname: profile.displayName },
            });
            if (sameNicknameUser) {
              const newUser = await User.create({
                email: profile?.emails[0].value,
                nickname: "기본닉네임_" + Date.now(),
                snsId: profile.id,
                src: src ? src : "default_male.png",
                provider: "google",
                gender: "male",
              });
              done(null, newUser); // 회원가입하고 로그인 인증 완료
            } else {
              // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
              const newUser = await User.create({
                email: profile?.emails[0].value,
                nickname: profile.displayName,
                snsId: profile.id,
                src: src ? src : "default_male.png",
                provider: "google",
                gender: "male",
              });
              done(null, newUser); // 회원가입하고 로그인 인증 완료
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
