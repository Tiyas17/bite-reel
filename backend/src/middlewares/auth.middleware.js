const foodPartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req, res, next) {
  const token = req.cookies.token;
  //see if token is present, I can say foodPartqner is logged in
  if (!token) {
    return res.status(401).json({ message: "Please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded token:", decoded);
    //NOTE: if token is verified, decoded will have the payload data we put while generating the token, i.e. the foodPartner id here and if its tampered, it will throw error and we will go to catch block
    const foodPartner = await foodPartnerModel.findById(decoded.foodPartnerId);
    req.foodPartner = foodPartner; //attaching foodPartner data to req object so that in the route handler we can access req.foodPartner to get the logged in foodPartner details
    next(); //go to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token, please login again" });
  }
}

async function authUserMiddleware(req, res, next) {
  const token = req.cookies.token;
  //see if token is present, I can say user is logged in
  if (!token) {
    return res.status(401).json({ message: "Please login first" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("Decoded token:", decoded);
    //NOTE: if token is verified, decoded will have the payload data we put while generating the token, i.e. the user id here and if its tampered, it will throw error and we will go to catch block
    const user = await userModel.findById(decoded.userId);
    req.user = user; //attaching user data to req object so that in the route handler we can access req.user to get the logged in user details
    next(); //go to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token, please login again" });
  }
}

module.exports = {
  authFoodPartnerMiddleware,
  authUserMiddleware,
};
