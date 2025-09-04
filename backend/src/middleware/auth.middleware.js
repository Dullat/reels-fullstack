const UserModel = require("../models/user.model.js");
const PartnerModel = require("../models/foodpartner.model.js");
const jwt = require("jsonwebtoken");
const unauthenticatedError = require("../erros/unauthenticated.error.js");

const authPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new unauthenticatedError("unauthenticated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await PartnerModel.findById(decoded.userId);
    req.partner = partner;
    next();
  } catch (error) {
    throw new unauthenticated("access denied");
  }
};

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    throw new unauthenticatedError("unauthenticated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    throw new unauthenticated("access denied");
  }
};

module.exports = { authPartnerMiddleware, authUserMiddleware };
