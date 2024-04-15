const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
   
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
   jwt: {
    secret: envVars.JWT_SECRET,
    // accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    // refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    // resetPasswordExpirationMinutes:
    //   envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    // verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
 
};
