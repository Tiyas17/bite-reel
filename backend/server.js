//start server
require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");

// connect to database
connectDB();

app.listen(3000, () => {
  console.log("server started at port 3000");
});
