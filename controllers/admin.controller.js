const { userService } = require("../services");
const { catchAsync } = require("../utils");

const createUser=catchAsync(async(req,res)=>{
    const user=await userService.createUser(req.body);
    res.status(200).json({message:"user Created successfully"})
})

module.exports={
    createUser
}