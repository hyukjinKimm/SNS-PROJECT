const express = require("express");
const bcypt = require("bcrypt");
const User = require("../models/user");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("index page");
});
module.exports = router;
