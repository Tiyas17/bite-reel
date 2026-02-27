const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  //before this the express.json() middleware should have run to parse the body
  const { fullName, email, password } = req.body;

  const isUserExist = await userModel.findOne({
    email: email,
  });

  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 15);

  const user = await userModel.create({
    fullName: fullName,
    email: email,
    password: hashedPassword,
  });
  //here techinically user is registered

  //token generation
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
  );

  //we are saving the token in cookie
  res.cookie("token", token);

  //note: tokens are created to identify users in subsequent requests like a pass

  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

async function loginUser(req, res) {
  //note before this the express.json() middleware runs to parse the body
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  if (user == null) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  //token generation
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
}

function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "User logged out successfully",
  });
}

async function registerFoodPartner(req, res) {
  //note before this the express.json() middleware should runs to parse the body
  const { name, email, password } = req.body;

  isFoodPartnerExist = await foodPartnerModel.findOne({
    email: email,
  });

  if (isFoodPartnerExist) {
    return res.status(400).json({
      message: "Food Partner already exists",
    });
  }

  //hash the password
  const hashedPassword = await bcrypt.hash(password, 15);

  const foodPartner = await foodPartnerModel.create({
    name: name,
    email: email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      foodPartnerId: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "Food Partner registered successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

async function loginFoodPartner(req, res) {
  //note before this the express.json() middleware runs to parse the body
  const { email, password } = req.body;
  const foodPartner = await foodPartnerModel.findOne({
    email: email,
  });
  if (foodPartner == null) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, foodPartner.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  //token generation
  const token = jwt.sign(
    {
      foodPartnerId: foodPartner._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);
  res.status(200).json({
    message: "Food Partner logged in successfully",
    foodPartner: {
      _id: foodPartner._id,
      name: foodPartner.name,
      email: foodPartner.email,
    },
  });
}

function logoutFoodPartner(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Food Partner logged out successfully",
  });
}

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  registerFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
