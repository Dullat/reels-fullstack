const {
  logout,
  registerUser,
  loginUser,
  registerPartner,
  loginPartner,
} = require("../controllers/auth.controller.js");
const express = require("express");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").post(logout);
router.route("/partner/register").post(registerPartner);
router.route("/partner/login").post(loginPartner);
router.route("/partner/logout").post(logout);

module.exports = router;
