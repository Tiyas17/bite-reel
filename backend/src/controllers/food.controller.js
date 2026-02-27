// lets first see what the frontend desires to do with food items

/*
1.upload a food video
2. description
3. Name of the food
*/

const foodModel = require("../models/food.model");
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

module.exports = {
  createFood,
  getFoodItems,
};
