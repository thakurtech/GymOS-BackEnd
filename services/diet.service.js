const httpStatus = require("http-status");
const Diet = require("../models/diet.model");
const { GoogleGenerativeAI } = require("@google/generative-ai");
// Access your API key as an environment variable (see "Set up your API key" above)
// load the env file and get the API key
require("dotenv").config();
const API_KEY = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY);

// ------------------- create diet ------------------
const saveDiet = async (dietBody) => {
  return await Diet.create(dietBody);
};

// ------------------- get diet by userId ------------------
const getDietById = async (id) => {
  return await Diet.findOne({ userId: id })
}

// ------------------- delete diet ------------------
const deleteDiet = async (id) => {
  return await Diet.deleteMany({ userId: id });
};

const createDiet = async (body) => {
  const { height, weight, bodyType, goal } = body;
  prompt =
    "You are a dietitian. You have a client who wants a diet plan. The client is a " +
    bodyType +
    " person with a height of " +
    height +
    " and weight of " +
    weight +
    ". The client wants to " +
    goal +
    "."+" Write a diet plan for the client in this format of json like this {Breakfast:[{food1:,quantity:},{food2:,quantity:}]} and same for Lunch, Dinner, Snacks, Drinks."
    " Do not give options for the meals. Give a specific meal plan for the client."+
    " Do not add any unnecessary information. Only give the diet plan."

  //  prompt="You are a "+bodyType+" person with a height of "+height+" and weight of "+weight+". You want to "+goal+"."+

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  //   const prompt = "Write a story about a magic backpack.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  text=text.replace("json","")
  try{
    text = text
    .split('`') // Split the string at every occurrence of the special character
    .join('');
    text=text.split('**')[0]
  }catch(e){
    console.log("error in removing the special character")
  }
  let jsonObject={}
  try{
  // replace the json word in the text
   jsonObject=JSON.parse(text);
  console.log(jsonObject)
  }catch(e){
    console.log("error in parsing the json")
  }
  console.log(text)
  return jsonObject;
};

const updateDiet= async (body) => {
  // update the diet plan for the given userId in body
  const { userId, dietPlan } = body;
  const diet = await Diet.findOne({
    userId: userId,
  });
  if (!diet) {
    return null;
  }
  diet.dietPlan = dietPlan;
  await diet.save();
  return diet;
}



module.exports = {
  saveDiet,
  deleteDiet,
  createDiet,
  getDietById,
  updateDiet
};
