const {ApiError,getUserModelByRole}=require("../utils")
const moment = require("moment");
const jwt = require("jsonwebtoken");
const  config  = require("../config/config.js");
const { tokenTypes } = require("../config/tokens.js");
const { Token } = require("../models/models.js");



const saveToken = async (
    token,
    userId,
    userModel,
    expires,
    type,
    blacklisted = false
  ) => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      userModel,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };

const generateToken = (
    userId,
    userModel,
    expires,
    type,
    secret = config.jwt.secret
  ) => {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      userModel,
      type,
    };
    return jwt.sign(payload, secret);
  };
  

const generateAuthTokens = async (user) => {
    const userModel = getUserModelByRole(user.role);
    // console.log("model = ", userModel);
  
    const accessTokenExpires = moment().add(
      config.jwt.accessExpirationMinutes,
      "minutes"
    );
  
    const accessToken = generateToken(
      user.id,
      userModel,
      accessTokenExpires,
      tokenTypes.ACCESS
    );
  
    const refreshTokenExpires = moment().add(
      config.jwt.refreshExpirationDays,
      "days"
    );
    const refreshToken = generateToken(
      user.id,
      userModel,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
    await saveToken(
      refreshToken,
      user.id,
      userModel,
      refreshTokenExpires,
      tokenTypes.REFRESH
    );
  
    // console.log("------------- Result of save token is --------------\n", res);
  
    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  };

  module.exports={
    generateAuthTokens
  }