const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");
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
            const src = "_" + Date.now() + ".png";
            download(
              profile._json.properties.profile_image,
              "./uploads/" + src,
              function () {
                console.log("done");
              }
            );

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
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
