const express = require("express");
const { authController } = require("../../controllers");
// const validate = require("../../middlewares/validate");
// const authValidation = require("../../validations/auth.validation");
// const authController = require("../../controllers/auth.controller");
// const auth = require("../../middlewares/auth");

const router = express.Router();


router.post(
    "/register-user-with-email-password",
    authController.registerUserWithEmailAndPassword
)

router.post(
    "/login-user-with-email-password",
    // validate(authValidation.loginWithEmailAndPassword),
    authController.loginUserWithEmailAndPassword
  );


module.exports=router;
