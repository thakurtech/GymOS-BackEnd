const httpStatus = require("http-status");
const { userService, adminService } = require(".");
const { ApiError } = require("../utils");

const loginUserWithEmailAndPassword = async (email, password) => {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email not registered");
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    if (!user.isEmailVerified) {
      throw new ApiError(httpStatus.FORBIDDEN, "Email not verified");
    }
    if(!user.isUserVerified){
      throw new ApiError(httpStatus.FORBIDDEN, "User not verified, contact admin to get verified");
    }

    return user;
  };


  const loginAdimWithEmailAndPassword = async (email, password) => {
    const user = await userService.getAdminByEmail(email);
    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Email not registered");
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    return user;
  };



  


  module.exports={
    loginUserWithEmailAndPassword,
    loginAdimWithEmailAndPassword,
    // getAdminByEmail
  }