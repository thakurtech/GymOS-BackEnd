const httpStatus = require("http-status");
const User = require("../models/user.model");
const { ApiError } = require("../utils");
const Admin = require("../models/admin.model");

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

const getAdminByEmail = async (email) => {
  const user= await Admin.findOne({ email });
  if(!user){
    return  null;
  }
return user;
};



  module.exports={
    createUser,
    getAdminByEmail,
    getUserByEmail,
  }
  