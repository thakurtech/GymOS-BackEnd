const { userService } = require("../services");
const { catchAsync } = require("../utils");

const deleteUser=catchAsync(async(req,res)=>{
    const user=await userService.deleteUser(req.params.id);
    res.status(200).json({message:"user deleted successfully"})
}
)

const updateUser=catchAsync(async(req,res)=>{
    const user=await userService.updateUser(req.body);
    res.status(200).json({message:"user updated successfully"})
}
)

const getAllUsers=catchAsync(async(req,res)=>{
    const user=await userService.getAllUsers();
    res.status(200).json({message:"users fetched successfully",data:user})
}
)

const getUserById=catchAsync(async(req,res)=>{
    const user=await userService.getUserById(req.params.id);
    res.status(200).json({message:"user fetched successfully",data:user})
}
)


module.exports={
    deleteUser,
    updateUser,
    getAllUsers,
    getUserById,
}