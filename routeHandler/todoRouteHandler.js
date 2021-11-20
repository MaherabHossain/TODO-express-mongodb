const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const router = express.Router();
const Todo = mongoose.model("Todo", todoSchema);
const checkLogin = require("../middlewares/checkLogin");
const userSchema = require("../schemas/userSchema");
const User = mongoose.model("User", userSchema);
// get all todos
router.get("/", checkLogin, async (req, res) => {
  try {
    const todo = await Todo.find().populate("user", "name username");
    res.status(500).json({
      message: "Success",
      data: todo,
    });
  } catch {
    res.status(500).json({
      error: "Thare was an server side error",
    });
  }
});
// find active todos
router.get("/active", checkLogin, async (req, res) => {
  console.log("come to me");
  const todo = new Todo();
  const data = await todo.findActive();

  res.status(200).json({
    data,
  });
});

router.get("/active-callback", checkLogin, (req, res) => {
  const todo = new Todo();
  todo.findActiveCallback((err, data) => {
    if (err) {
      res.status(500).json({
        error: "there was an server side error",
      });
    } else {
      res.status(200).json({
        data,
      });
    }
  });
});
// get like title statics method
router.get("/JS", async (req, res) => {
  const data = await Todo.findByJS();
  res.status(200).json({
    data,
  });
});

router.get("/description", async (req, res) => {
  const data = await Todo.find().byDescription("hours");
  res.status(200).json({
    data,
  });
});
// get a single todo
router.get("/:id", checkLogin, async (req, res) => {
  try {
    const data = await Todo.find({ _id: req.params.id });
    res.status(200).json({
      result: data,
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// create a new todo
router.post("/", checkLogin, async (req, res) => {
  try {
    const newTodo = new Todo({
      ...req.body,
      user: req.userId,
    });
    const todo = await newTodo.save();
    await User.updateOne(
      { _id: req.userId },
      {
        $push: {
          todos: todo.id,
        },
      }
    );
    res.status(200).json({
      message: "Todo insert Successfully",
    });
  } catch {
    res.status(500).json({
      error: "there was a server side error!",
    });
  }
});

// create multiple todo
router.post("/all", checkLogin, (req, res) => {
  Todo.insertMany(req.body, (err, todo) => {
    if (err) {
      res.status(500).json({
        error: "thare was an server side error",
      });
    } else {
      res.status(201).json({
        status: "Success",
        todo,
      });
    }
  });
});

router.put("/:id", checkLogin, async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: "inactive",
          tittle: "sleep",
        },
      },
      {
        new: true,
      }
    );
    console.log(result);
    res.status(200).json({
      message: "data updated suscessfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "there was an server side error",
      message: err,
    });
  }
});

router.delete("/:id", checkLogin, (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).json({
        error: "thare was an server side error",
      });
    } else {
      res.status(200).json({
        status: "Successfully delete data",
      });
    }
  });
});

module.exports = router;
