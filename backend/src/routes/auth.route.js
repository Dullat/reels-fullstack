const {
  registerUser,
  loginUser,
} = require("../controllers/auth.controller.js");
const express = require("express");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);

module.exports = router;
