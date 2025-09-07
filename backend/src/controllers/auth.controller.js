const bcrypt = require("bcrypt");
const BadRequestError = require("../erros/badrequest.error.js");
const userModel = require("../models/user.model.js");
const PartnerModel = require("../models/foodpartner.model.js");

const userTokenModel = require("../models/usertoken.model.js");
const partnerTokenModel = require("../models/partnertoken.model.js");
const UnauthenticatedError = require("../erros/unauthenticated.error.js");


const generateAccessAndRefreshToken = (client) => {
  const accessToken = client.createJWT();
  const refreshToken = client.genrateRefreshToken();
  return { accessToken, refreshToken };
};

// ================== USER ===================
const registerUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname || !email || !password) {
    throw new BadRequestError("Please provide creds");
  }

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    throw new BadRequestError("user already exists...");
  }

  const user = await userModel.create({
    fullname: fullname,
    email: email,
    password: password,
  });

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user)
  
  const token =  await userTokenModel.create({
    userId: user._id,
    refreshToken: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
  });

  if (!token) {
    throw new UnauthenticatedError("Token gen failed")
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 15
  }).cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    path: "/api/auth/user/"
  })

  res.status(201).json({
    message: "user created successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide creds");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    throw new BadRequestError("invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    throw new BadRequestError("Wrong password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user)
  
  const token = await userTokenModel.create({
    userId: user._id,
    refreshToken: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
  });

  if (!token) {
    throw new UnauthenticatedError("Token gen failed")
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 15
  }).cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 24 * 90,
    path: "/api/auth/user/"
  })

  res.status(200).json({
    message: "user Logged-in successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};

const logout = async (req, res) => {
  console.log("partner token", req.partner);
  if (req.partner) {
    const partnerToken = await partnerTokenModel.findOneAndUpdate({ partnerId: req.partner._id }, {
      isValid: false
    });
  }
  if (req.user) {
    const userToken = await userTokenModel.findOneAndUpdate({ userId: req.user._id }, {
      isValid: false
    });
  }

  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({
    message: "Logged out successfully",
  });
};

// ================ partner ================

const registerPartner = async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide creds");
  }

  const isPartnerAlreadyExists = await PartnerModel.findOne({ email });

  if (isPartnerAlreadyExists) {
    throw new BadRequestError("partner already exists...");
  }

  const partner = await PartnerModel.create({
    name: name,
    phone: phone,
    address: address,
    email: email,
    password: password,
  });

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(partner)

  const token = await partnerTokenModel.create({
    partnerId: partner._id,
    refreshToken: refreshToken,
    userAgent: req.headers["user-agent"],
    ip: req.ip,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
  })

  if (!token) {
    throw new UnauthenticatedError("Token gen failed")
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 90,
    path: "/api/auth/partner/"
  });

  res.status(201).json({
    message: "partner created successfully",
    user: {
      _id: partner._id,
      fullname: partner.fullname,
      email: partner.email,
    },
  });
};

// Login partner

const loginPartner = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide creds");
  }

  const partner = await PartnerModel.findOne({ email });
  if (!partner) {
    throw new BadRequestError("invalid email or password");
  }

  const isPasswordValid = await partner.comparePassword(password);

  if (!isPasswordValid) {
    throw new BadRequestError("Wrong password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(partner);

  // validate the token

  const token = await partnerTokenModel.create(
    {
      partnerId: partner._id,
      refreshToken: refreshToken,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
    }
  );

  if (!token) {
    throw new BadRequestError("Something went wrong");
  }

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 90,
    path: "/api/auth/partner/"
  });

  res.status(200).json({
    message: "partner Logged-in successfully",
    user: {
      _id: partner._id,
      fullname: partner.fullname,
      email: partner.email,
    },
  });
};

// Get new Access token and Update Refresh Token

const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new UnauthenticatedError("unauthenticated");
  }

  const partner = await PartnerModel.findById(req.partnerId)

  if (!partner) {
    throw new BadRequestError("Partner is not found")
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(partner)
  try {
    const updatedToken = await partnerTokenModel.findOneAndUpdate({ partnerId: partner._id, refreshToken: token }, {
      refreshToken: refreshToken,
      lastUsed: Date.now(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
    })

    res.status(200).cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    }).cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 90
    }).json({ message: "token refreshed" })
  } catch (error) {
    throw new BadRequestError("failed to update token")
  }
}

// ######### export #########
module.exports = {
  registerUser,
  loginUser,
  logout,
  registerPartner,
  loginPartner,
  refreshAccessToken
};
