const httpStatus = require("http-status");
const User = require("../models/user.model");
const { ApiError } = require("../utils");

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    if (await User.isMobileTaken(userBody.mobile)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mobile already taken");
    }
    return  await User.create(userBody);
  };

  const getUserByEmail = async (email) => {
    const user= await User.findOne({ email });
    if(!user){
      return  null;
    }
  return user;
};


  module.exports={
    createUser,
    getUserByEmail
  }
  