//express js import
const express = require("express");
const app = express();
//mongosse import
const mongoose = require("mongoose");
//import dotenv and config
require("dotenv").config();

//custome routes
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

//database connetion
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Databse connection Sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//make express use json API
app.use(express.json());

//user api end point
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

//app running port
app.listen(process.env.PORT || 5000, () => {
  console.log("BackEnd server online");
});
