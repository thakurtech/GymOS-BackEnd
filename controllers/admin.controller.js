const { userService } = require("../services");
const { catchAsync } = require("../utils");

const createUser=catchAsync(async(req,res)=>{
    req.body.gym=req.user._id
    console.log(req.body.gym,"gym id ")
    const user=await userService.createUser(req.body);
    res.status(200).json({message:"user Created successfully"})
})

const getUnverifiedUsers=catchAsync(async(req,res)=>{
    const users=await userService.getUnverifiedUsers();
    res.status(200).json({users})
})

const verifyUser=catchAsync(async(req,res)=>{
    const user=await userService.verifyUser(req.params.id);
    res.status(200).json({message:"User verified successfully"})
})

module.exports={
    createUser,
    getUnverifiedUsers,
    verifyUser
}