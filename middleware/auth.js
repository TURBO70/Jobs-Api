const jwt = require("jsonwebtoken");
const User =require('../models/User.model');
const { UnauthenticatedError } = require("../errors");
const auth = async (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const userId=await User.find({email}); 
    if (!userId){
      throw new UnauthenticatedError("Invalid Credentials");
    }
    req.user = { userId};
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid");
  }
};
module.exports = auth;
