const {
  logout,
  registerUser,
  loginUser,
  registerPartner,
  loginPartner,
  refreshAccessToken
} = require("../controllers/auth.controller.js");
const { authPartnerMiddleware, authUserMiddleware, authRefreshToken } = require("../middleware/auth.middleware.js");
const express = require("express");

const router = express.Router();

router.route("/user/register").post(registerUser);
router.route("/user/login").post(loginUser);
router.route("/user/logout").post(logout);
router.route("/partner/register").post(registerPartner);
router.route("/partner/login").post(loginPartner);

// Grant access and refresh token 
router.route("/partner/refresh").post(authRefreshToken ,refreshAccessToken);

// Protected routes
router.route("/partner/logout").post(authPartnerMiddleware,logout);

module.exports = router;
