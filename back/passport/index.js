const passport = require("passport");
const local = require("./localStrategy");

const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id); // done(서버에러, xxx) 쿠키와 user.id 만 서버 메모리에 저장함.
  });

  passport.deserializeUser(async (id, done) => {
    // req.user 에 정보를 넣어줌
    try {
      console.log("deserialize");
      const user = User.findOne({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
