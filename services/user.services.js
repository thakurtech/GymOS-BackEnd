const httpStatus = require("http-status");
const User = require("../models/user.model");
const { ApiError } = require("../utils");
const Admin = require("../models/admin.model");

// ------------------- create user ------------------
const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
    }
    if (await User.isMobileTaken(userBody.mobile)) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Mobile already taken");
    }
    return  await User.create(userBody);
  };

  // ------------------- get user by email ------------------
  const getUserByEmail = async (email) => {
    const user= await User.findOne({ email });
    if(!user){
      return  null;
    }
  return user;
};

// ------------------- get admin by email ------------------
const getAdminByEmail = async (email) => {
  const user= await Admin.findOne({ email });
  if(!user){
    return  null;
  }
return user;
};

// ------------------- update user details ------------------
const updateUser = async (userBody) => {
  return  await User.update(userBody);
}

// ------------------- delete user ------------------
const deleteUser = async (userBody) => {
  return  await User.delete(userBody);
}

// ------------------- get all users ------------------
const getAllUsers = async () => {
  return  await User.find();
}

// ------------------- get user by id ------------------
const getUserById = async (id) => {
  return  await User.findById(id);
}

// -------------------get unverified users ------------------
const getUnverifiedUsers = async () => {
  // sort them in the order of latest created
  return await User.find({isUserVerified:false}).sort({createdAt:-1});

}
// ------------------- verify user ------------------
const verifyUser = async (id) => {
  return await User.updateOne({_id:id},{isUserVerified:true,isEmailVerified:true});
}






  module.exports={
    createUser,
    getAdminByEmail,
    getUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUnverifiedUsers,
    verifyUser
  }
  