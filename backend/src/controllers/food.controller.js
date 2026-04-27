// lets first see what the frontend desires to do with food items

/*
1.upload a food video
2. description
3. Name of the food
*/

const foodModel = require("../models/food.model");
const likeModel=require('../models/likes.model');
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");

//to generate unique ids for file names
const { randomUUID } = require("crypto");
const id = randomUUID();

async function createFood(req, res) {
  /*
  console.log(req.foodPartner);
  console.log(req.body);
  console.log(req.file);
  */

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    randomUUID(),
  );
  //fileUploadResult will have the url of the uploaded video
  //console.log(fileUploadResult);

  //now create a food item in the database
  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).json({
    message: "Food item created successfully",
    food: foodItem,
  });
  /*
    note : the foodPartner details are coming from the authFoodPartnerMiddleware where we are attaching the foodPartner data to req object after verifying the token, so in any route handler that comes after that middleware, we can access req.foodPartner to get the logged in foodPartner details
    */
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find();
  res.status(200).json({
    message: "Food items fetched successfully",
    food: foodItems,
  });
}

async function likeFoodItem(req, res) {
const {foodId}=req.body;
const user=req.user;
const isAlreadyLiked=await likeModel.findOne({
  user:user._id,
  food:foodId,
})

if(isAlreadyLiked){
  //unlike the food item
  await likeModel.deleteOne({
    user:user._id,
    food:foodId,
  });
  await foodModel.findByIdAndUpdate(foodId, {
    $inc:{likes:-1},
  });
  return res.status(200).json({
    message:"Food item unliked successfully",
  })
}

const like=await likeModel.create({
  user:user._id,
  food:foodId,
})

await foodModel.findByIdAndUpdate(foodId, {
  $inc:{likes:1},
})

res.status(201).json({
  message:"Food item liked successfully",
  like
})
}

async function saveFoodItem(req, res) {
  const {foodId}=req.body;
  const user=req.user;

  const isAlreadySaved=await saveModel.findOne({
  user:user._id,
  food:foodId,
})

if(isAlreadySaved){
  saveModel.deleteOne({
    user:user._id,
    food:foodId
  })

  await foodModel.findByIdAndUpdate(foodId,{
    $inc:{savesCount:-1},
  })

  return res.status(200).json({
    message:"Food item unsaved successfully",
  })
}

const save=await saveModel.create({
  user:user._id,
  food:foodId,    
})
await foodModel.findByIdAndUpdate(foodId,{
  $inc:{savesCount:1},
})
res.status(201).json({
  message:"Food item saved successfully",
  save,
})
}

async function getSavedFoodItems(req, res) {
  const user=req.user;
  const savedItems=await saveModel.find({user:user._id}).populate('food');

  if(!savedItems || savedItems.length===0){
    return res.status(404).json({
      message:"No saved food items found for this user",
    })
  } 

  res.status(200).json({
    message:"Saved food items fetched successfully",
    savedItems
  })
}

module.exports = {
  createFood,
  getFoodItems,
  likeFoodItem,
  saveFoodItem,
  getSavedFoodItems,
};
