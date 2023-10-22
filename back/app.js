const express = require("express");
const postRouter = require("./routes/post");
const app = express();
const dotenv = require("dotenv");
const { sequelize } = require("./models");

dotenv.config();
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/post", postRouter);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.listen(3065, () => {
  console.log("서버 실행중");
});
