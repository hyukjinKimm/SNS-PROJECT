const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { getUser, joinUser } = require("../controllers/user");
const router = express.Router();
router.get("/", getUser);
router.post("/", isNotLoggedIn, joinUser);
module.exports = router;
