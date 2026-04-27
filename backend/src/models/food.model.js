const mongoose = require("mongoose");
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  video: {
    type: String, //because we will store video URL
    required: true,
  },
  description: {
    type: String,
  },
  foodPartner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner",
    required: true,
  },
  likes:{
    type:Number,
    default:0,
  },
  savesCount:{
    type:Number,
    default:0,
  }
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
