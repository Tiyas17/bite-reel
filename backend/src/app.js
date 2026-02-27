// create server
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const authroutes = require("./routes/auth.routes");
const foodroutes = require("./routes/food.routes");

app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  }),
);
//this middleware will parse json bodies from incoming requests eg. req.body
app.use(express.json());

//note: with every incoming request, cookies are sent along with it and cookieParser are required to read those cookies
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/food", foodroutes);

module.exports = app;

/*
app.get("/", (req, res) => {
  res.send("hello world");
});
*/
