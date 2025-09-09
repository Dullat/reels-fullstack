const UserModel = require("../models/user.model.js");
const PartnerModel = require("../models/foodpartner.model.js");
const PartnerToken = require("../models/partnertoken.model.js");
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../erros/unauthenticated.error.js");

const authPartnerMiddleware = async (req, res, next) => {
  console.log(req.cookies.accessToken);
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    throw new UnauthenticatedError("unauthenticated");
  }

  console.log("token ", token);

  // const token = req.cookier?.accessToken || req.headers("Authorization").replace("Bearer ", "")
  // you also do this when access is made form mobile application
  // coz there we dont have cookies

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await PartnerModel.findById(decoded.partnerId);
    req.partner = partner;
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("access denied");
  }
};

const authUserMiddleware = async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new UnauthenticatedError("unauthenticated"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return next(new UnauthenticatedError("User not found"));
    }
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("access denied");
  }
};

const authRefreshToken = async (req, res, next) => {
  const token =
    req.cookies.refreshToken ||
    req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    throw new UnauthenticatedError("No token provied");
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const dbToken = await PartnerToken.findOne({
      partnerId: payload.partnerId,
      refreshToken: token,
    });

    if (!dbToken || !payload) {
      throw new UnauthenticatedError("Invalid token");
    }
    req.partnerId = payload.partnerId;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Invalid or missing...");
  }
};

module.exports = {
  authPartnerMiddleware,
  authUserMiddleware,
  authRefreshToken,
};
