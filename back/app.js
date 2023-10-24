const express = require("express");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const cors = require("cors");
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
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json()); // 데이터를 req.body 안에 넣어줌
app.use(express.urlencoded({ extended: true })); // form 을 submit 했을때 데이터를 처리해줌
app.use("/user", userRouter);
app.use("/post", postRouter);

app.listen(3065, () => {
  console.log("서버 실행중");
});
