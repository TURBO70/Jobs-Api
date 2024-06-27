const User = require("../models/User.model");
const { StatusCodes } = require("http-status-codes");
const { UnauthenticatedError } = require("../errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const user = await User.create(req.body);
  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.status(StatusCodes.OK).json({ user, token });
};

module.exports = {
  register,
  login,
};
