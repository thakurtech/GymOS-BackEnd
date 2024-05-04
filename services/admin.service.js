const Admin = require("../models/admin.model");

const createAdmin=async(userBody)=>{
    if (await Admin.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
      }
      return  await Admin.create(userBody);
    };


    const getAdminByEmail = async (email) => {
        const user= await Admin.findOne({ email });
        if(!user){
          return  null;
        }
      return user;
      };
      
  


module.exports={
    createAdmin,
    getAdminByEmail
}