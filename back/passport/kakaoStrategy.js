const http = require("http"); // or 'https' for https:// URLs
const fs = require("fs");
const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const User = require("../models/user");

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
            let src = false;
            if (profile._json.properties.profile_image) {
              src = "_" + Date.now() + ".png";
              console.log(src);
              const file = fs.createWriteStream("uploads/" + src);
              http.get(
                profile._json.properties.profile_image,
                function (response) {
                  response.pipe(file);
                  // after download completed close filestream
                  file.on("finish", () => {
                    file.close();
                  });
                }
              );
            }

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
