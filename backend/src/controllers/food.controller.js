const foodModel = require("../models/food.model");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const storageService = require("../services/storage.service");
const { randomUUID } = require("crypto");

async function createFood(req, res) {
  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    randomUUID()
  );
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
}

async function getFoodItems(req, res) {
  const userId = req.user._id;

  const foodItems = await foodModel.find();

  if (foodItems.length === 0) {
    return res.status(200).json({ message: "No food items found", food: [] });
  }

  const foodIds = foodItems.map((f) => f._id);

  // fetch only the like/save records that belong to this user AND are in this batch
  const [userLikes, userSaves] = await Promise.all([
    likeModel.find({ user: userId, food: { $in: foodIds } }).select("food"),
    saveModel.find({ user: userId, food: { $in: foodIds } }).select("food"),
  ]);

  // build Sets of food-id strings for O(1) lookup
  const likedSet = new Set(userLikes.map((l) => l.food.toString()));
  const savedSet = new Set(userSaves.map((s) => s.food.toString()));

  const food = foodItems.map((item) => ({
    ...item.toObject(),
    isLiked: likedSet.has(item._id.toString()),
    isSaved: savedSet.has(item._id.toString()),
  }));

  res.status(200).json({ message: "Food items fetched successfully", food });
}

async function likeFoodItem(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadyLiked) {
    await likeModel.deleteOne({ user: user._id, food: foodId });
    await foodModel.findByIdAndUpdate(foodId, { $inc: { likes: -1 } });
    return res.status(200).json({ message: "Food item unliked successfully" });
  }

  const like = await likeModel.create({ user: user._id, food: foodId });
  await foodModel.findByIdAndUpdate(foodId, { $inc: { likes: 1 } });
  res.status(201).json({ message: "Food item liked successfully", like });
}

async function saveFoodItem(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadySaved = await saveModel.findOne({
    user: user._id,
    food: foodId,
  });

  if (isAlreadySaved) {
    await saveModel.deleteOne({ user: user._id, food: foodId });
    // aggregation pipeline update: clamp savesCount to minimum 0 atomically
    await foodModel.findByIdAndUpdate(foodId, {$inc: { savesCount: -1 }});
    return res.status(200).json({ message: "Food item unsaved successfully" });
  }

  const save = await saveModel.create({ user: user._id, food: foodId });
  await foodModel.findByIdAndUpdate(foodId, { $inc: { savesCount: 1 } });
  res.status(201).json({ message: "Food item saved successfully", save });
}

async function getSavedFoodItems(req, res) {
  const user = req.user;
  const savedItems = await saveModel.find({ user: user._id }).populate("food");
  if (!savedItems || savedItems.length === 0) {
    return res
      .status(404)
      .json({ message: "No saved food items found for this user" });
  }
  res.status(200).json({
    message: "Saved food items fetched successfully",
    savedItems,
  });
}

module.exports = {
  createFood,
  getFoodItems,
  likeFoodItem,
  saveFoodItem,
  getSavedFoodItems,
};