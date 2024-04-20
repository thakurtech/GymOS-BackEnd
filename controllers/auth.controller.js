const httpStatus = require("http-status");
// const User = require("../models/user.model");
const { userService, authService, tokenService ,adminService} = require("../services");
const { catchAsync } = require("../utils");


const registerUserWithEmailAndPassword = catchAsync(async (req, res) => {
  console.log(req.body)
    const user = await userService.createUser(req.body);//the phone number should be with country code
    // Send verification Email
    res.status(httpStatus.CREATED).send({
      user,
      message:
        "User registered Successfully,  please check your email for account verification",
    });
  });


  const registerAdminWithEmailAndPassword = catchAsync(async (req, res) => {
    console.log(req.body)
      const user = await adminService.createAdmin(req.body);//the phone number should be with country code
      // Send verification Email
      res.status(httpStatus.CREATED).send({
        user,
        message:
          "User registered Successfully,  please check your email for account verification",
      });
    });


const loginUserWithEmailAndPassword = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
 
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});



const loginAdminWithEmailAndPassword = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginAdimWithEmailAndPassword(email, password);
 
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

module.exports={
    registerUserWithEmailAndPassword,
    loginUserWithEmailAndPassword,
    loginAdminWithEmailAndPassword,
    registerAdminWithEmailAndPassword
}