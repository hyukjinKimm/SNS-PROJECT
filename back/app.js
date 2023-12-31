const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const indexRouter = require("./routes");
const postRouter = require("./routes/post");
const postsRouter = require("./routes/posts");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const passportConfig = require("./passport");
const app = express();
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();

app.use(morgan("dev"));
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
passportConfig();
app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json({ limit: "50mb" })); // 데이터를 req.body 안에 넣어줌
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // form 을 submit 했을때 데이터를 처리해줌
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_SECRET,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/", indexRouter);

//app.use((err, req, res ,next) => {

//})
app.listen(3065, () => {
  console.log("서버 실행중");
});
