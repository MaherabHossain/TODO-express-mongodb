const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routeHandler/todoRouteHandler");
const userHandler = require("./routeHandler/userRouteHandler");

mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("successfullt connected to mongodb"))
  .catch((err) => console.log(err));

const app = express();
dotenv.config();
app.use(express.json());

app.listen(3000, () => console.log("server is running on port 3000"));

app.use("/todo", todoHandler);
app.use("/user", userHandler);
