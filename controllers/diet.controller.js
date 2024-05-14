const { saveDiet,deleteDiet,createDiet,getDietById,updateDiet } = require("../services/diet.service");
const { catchAsync } = require("../utils");
const httpStatus = require("http-status");

const addDietFunction=catchAsync(async(req,res)=>{
    // check if the user is already present with userId
    const user=await getDietById(req.body.userId);
    // if already exist then just update the diet
    if(user){
        const diet=await updateDiet(req.body);
        res.status(200).json({message:"Diet Updated successfully"})
    }
    
    const diet=await saveDiet(req.body);
    res.status(200).json({message:"Diet Added successfully"})
}
)

const fetchDietFunction=catchAsync(async(req,res)=>{
    const diet=await getDietById(req.params.id);
    res.status(200).json({message:"Diet fetched successfully",data:diet})
}
)

const deleteDietFunction=catchAsync(async(req,res)=>{
    const diet=await deleteDiet(req.params.id);
    res.status(200).json({message:"Diet deleted successfully"})
}
)

const createDietFunction=catchAsync(async(req,res)=>{
    const diet=await createDiet(req.body);
    res.status(200).json({message:"Diet Created successfully",data:diet})
}
)

module.exports={
    createDietFunction,
    deleteDietFunction,
    addDietFunction,
    fetchDietFunction
}