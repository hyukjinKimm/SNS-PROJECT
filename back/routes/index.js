const express = require("express");
const router = express.Router();
const { getUser, joinUser, getProfileOwner } = require("../controllers/user");
router.get("/", (req, res) => {
  res.send("index page");
});

module.exports = router;
