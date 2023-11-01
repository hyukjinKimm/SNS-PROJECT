const express = require("express");
const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { logIn, logOut } = require("../controllers/auth");
const router = express.Router();

router.post("/login", isNotLoggedIn, logIn);
router.get("/logout", isLoggedIn, logOut);

module.exports = router;
