const httpStatus = require("http-status");
const { userService } = require(".");
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
    return user;
  };


  module.exports={
    loginUserWithEmailAndPassword
  }