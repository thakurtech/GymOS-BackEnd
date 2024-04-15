const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

dotenv.config({ path: path.join(__dirname, "../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("production", "development", "test")
      .required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description("Mongo DB url"),
    FRONTEND_WEB_BASE_URL: Joi.string()
      .required()
      .description("Frontend website base url"),
    ADMIN_FRONTEND_WEB_BASE_URL: Joi.string().description(
      "Admin Frontend website base url"
    ),
    JWT_SECRET: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
      .default(30)
      .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description("days after which refresh tokens expire"),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which reset password token expires"),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description("minutes after which verify email token expires"),
    AWS_SES_ACCESS_KEY_ID: Joi.string()
      .required()
      .description("AWS SES access key id"),
    AWS_SES_SECRET_ACCESS_KEY: Joi.string()
      .required()
      .description("AWS SES secret access key"),
    AWS_SES_REGION: Joi.string().required().description("AWS SES region"),
    EMAIL_FROM: Joi.string().description(
      "the from field in the emails sent by the app"
    ),
    EMAIL_TO: Joi.string().description(
      "for contact us purpose"
    ),
    AWS_S3_ACCESS_KEY: Joi.string().required().description("AWS S3 access key"),
    AWS_S3_SECRET_ACCESS_KEY: Joi.string()
      .required()
      .description("AWS S3 secret access key"),
    AWS_S3_REGION: Joi.string().required().description("AWS S3 region"),
    AWS_S3_BUCKET_NAME: Joi.string()
      .required()
      .description("AWS S3 Bucket Name"),
    RAZORPAY_ID_KEY: Joi.string().description("Razorpay Id Key"),
    RAZORPAY_SECRET_KEY: Joi.string().description("Razorpay Secret Key"),
    NIMBUS_EMAIL: Joi.string().required().description("Nimbus Email"),
    NIMBUS_PASSWORD: Joi.string().required().description("Nimbus Password"),
    MSG_KEY:Joi.string().required().description("MSG 91 key "),
    MSG91_BASE_URL:Joi.string().required().description("Msg91 base URL"),
    TEMPLATE_ID:Joi.string().required().description("Template ID message 91")
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url:
      envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "test" : "lelekart"),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  frontendWebBaseUrl: envVars.FRONTEND_WEB_BASE_URL,
  adminFrontBaseUrl: envVars.ADMIN_FRONTEND_WEB_BASE_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    aws: {
      accessKeyId: envVars.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey: envVars.AWS_SES_SECRET_ACCESS_KEY,
      region: envVars.AWS_SES_REGION,
    },
    from: envVars.EMAIL_FROM,
    to:envVars.EMAIL_TO
  },
  files: {
    awsS3: {
      bucketName: envVars.AWS_S3_BUCKET_NAME,
      accessKeyId: envVars.AWS_S3_ACCESS_KEY,
      secretAccessKey: envVars.AWS_S3_SECRET_ACCESS_KEY,
      region: envVars.AWS_S3_REGION,
    },
  },
  razorpay: {
    id: envVars.RAZORPAY_ID_KEY,
    secret: envVars.RAZORPAY_SECRET_KEY,
  },
  nimbus: {
    email: envVars.NIMBUS_EMAIL,
    password: envVars.NIMBUS_PASSWORD,
  },
  msg:{
    key:envVars.MSG_KEY,
  },
  msg91baseUrl:{
    msg91BaseeUrl:envVars.MSG91_BASE_URL,
    templateID:envVars.TEMPLATE_ID
  }
};
