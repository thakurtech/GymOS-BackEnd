const express = require("express");
const { authController } = require("../../controllers");
const auth = require("../../middlewares/auth");
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

  router.post(
    "/register-admin-with-email-password",
    authController.registerAdminWithEmailAndPassword
)

  router.post(
    "/login-admin-with-email-password",
    // auth("manageUsers"),
    // validate(authValidation.loginWithEmailAndPassword),
    authController.loginAdminWithEmailAndPassword
  );

  router.get(
    "is-admin-authenticated",
    auth("manageUsers"),
    authController.loginAdminWithEmailAndPassword
  )

  router.get(
    "is-user-authenticated",
    auth("getProducts"),
    authController.loginUserWithEmailAndPassword
  )



module.exports=router;
