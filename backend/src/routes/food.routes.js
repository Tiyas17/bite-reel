const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});

/* [POST] /api/food [protected] FOR THE FOOD PARTNER TO ADD A NEW FOOD ITEM */
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("video"),
  foodController.createFood,
);

/* [GET] /api/food/ [protected] for only the users */
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);
router.post("/like", authMiddleware.authUserMiddleware, foodController.likeFoodItem);
router.post('/save', authMiddleware.authUserMiddleware, foodController.saveFoodItem);
router.get('/save', authMiddleware.authUserMiddleware, foodController.getSavedFoodItems);

module.exports = router;
