const express = require("express");
const auth = require("../../middlewares/auth");
const { adminController } = require("../../controllers");

// const validate = require("../../middlewares/validate");
// const authValidation = require("../../validations/auth.validation");
// const authController = require("../../controllers/auth.controller");
// const auth = require("../../middlewares/auth");

const router = express.Router();

router.post("/register-user"
,auth("manageUsers")
,adminController.createUser)



module.exports=router;



