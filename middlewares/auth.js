const passport = require("passport");
const httpStatus = require("http-status");
const { ApiError } = require("../utils");
const { allRights } = require("../config/roles");

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject(
        new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
      );
    }
    req.user = user;
    if (requiredRights.length == 0) {
      resolve();
      return;
    }

    const rights = allRights.get(user.role) || [];
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      rights.includes(requiredRight)
    );

    if (!hasRequiredRights) {
      return reject(new ApiError(httpStatus.FORBIDDEN, "Forbidden"));
    }
    resolve();
  };

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    return new Promise((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));
  };

module.exports = auth;
