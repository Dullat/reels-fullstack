const bcrypt = require("bcrypt");
const BadRequestError = require("../erros/badrequest.error.js");
const userModel = require("../models/user.model.js");

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

  const token = user.createJWT();

  res.cookie("token", token);

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

  const token = user.createJWT();

  res.cookie("token", token);

  res.status(200).json({
    message: "user Logged-in successfully",
    user: {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
    },
  });
};

module.exports = { registerUser, loginUser };
