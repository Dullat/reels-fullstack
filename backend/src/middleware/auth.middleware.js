const UserModel = require("../models/user.model.js");
const PartnerModel = require("../models/foodpartner.model.js");
const jwt = require("jsonwebtoken");
const UnauthenticatedError = require("../erros/unauthenticated.error.js");

const authPartnerMiddleware = async (req, res, next) => {
  console.log(req.cookies.accessToken);
  const token = req.cookies.accessToken;
  if (!token) {
    throw new UnauthenticatedError("unauthenticated");
  }
  
  // const token = req.cookier?.accessToken || req.headers("Authorization").replace("Bearer ", "")
  // you also do this when access is made form mobile application
  // coz there we dont have cookies



  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await PartnerModel.findById(decoded.userId);
    req.partner = partner;
    next();
  } catch (error) {
    console.log(error)
    throw new UnauthenticatedError("access denied");
  }
};

const authUserMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new UnauthenticatedError("unauthenticated");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("access denied");
  }
};

module.exports = { authPartnerMiddleware, authUserMiddleware };
