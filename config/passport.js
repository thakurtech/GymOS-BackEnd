const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const config = require("./config.js");
const { tokenTypes } = require("./tokens.js");
const { User, Vendor, Admin, Agent } = require("../models/models.js");

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    if (payload.userModel === "User") {
      const user = await User.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    } else if(payload.userModel === "Agent")
    {
      const agent = await Agent.findById(payload.sub);
      if(!agent) {
        return done(null, false);
      }
      done(null, agent);

    } else {
      const admin = await Admin.findById(payload.sub);
      if (!admin) {
        return done(null, false);
      }
      done(null, admin);
    }
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
  jwtStrategy,
};
