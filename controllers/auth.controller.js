

const registerUserWithEmailAndPassword = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);//the phone number should be with country code
    // Send verification Email
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
    await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  
    res.status(httpStatus.CREATED).send({
      user,
      message:
        "User registered Successfully,  please check your email for account verification",
    });
  });


module.exports={
    registerUserWithEmailAndPassword
}