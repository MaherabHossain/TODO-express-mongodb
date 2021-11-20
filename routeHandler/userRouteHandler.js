const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const User = mongoose.model("User", userSchema);

// create new user

router.post("/", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPass,
    });
    await user.save();
    res.status(200).json({
      status: "success",
      message: "user created successfullt :) ",
    });
  } catch {
    res.status(500).json({
      error: "faild to create new user ",
    });
  }
});
// user login
router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    console.log(user);
    if (user && user.length > 0) {
      const isValid = await bcrypt.compare(req.body.password, user[0].password);
      if (isValid) {
        const token = jwt.sign(
          {
            name: req.body.name,
            username: user[0].username,
            id: user[0]._id,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        res.status(200).json({
          access_token: token,
          message: "successfully loged in!",
        });
      }
    } else {
      res.status(401).json({
        error: "Auth failed! from me",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.get("/all", async (req, res) => {
  const user = await User.find().populate("todos");
  res.status(200).json({
    status: "Success",
    data: user,
  });
});

module.exports = router;
