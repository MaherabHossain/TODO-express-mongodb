const express = require("express");
const mongoose = require("mongoose");
const todoSchema = require("../schemas/todoSchema");
const router = express.Router();
const Todo = mongoose.model("Todo", todoSchema);

// get all todos
router.get("/", (req, res) => {
  Todo.find().exec((err, data) => {
    if (err) {
      res.status(500).json({
        error: "Thare was an server side error",
      });
    } else {
      res.status(200).json({
        status: "Success",
        all_todo: data,
      });
    }
  });
});
// get a single todo
router.get("/:id", async (req, res) => {
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
router.post("/", (req, res) => {
  const newTodo = new Todo(req.body);
  newTodo.save((err, todo) => {
    if (err) {
      res.status(500).json({
        error: "Thare was an server side error",
      });
    } else {
      res.status(201).json({
        status: "success",
        todo,
      });
    }
  });
});
// create multiple todo
router.post("/all", (req, res) => {
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

router.put("/:id", async (req, res) => {
  // try {
  //   await Todo.updateOne(
  //     { _id: req.params.id },
  //     {
  //       $set: {
  //         status: "active",
  //       },
  //     }
  //   );
  //   res.status(200).json({
  //     message: "data updated suscessfully",
  //   });
  // } catch (err) {
  //   res.status(500).json({
  //     error: "there was an server side error",
  //     message: err,
  //   });
  // }
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

router.delete("/:id", (req, res) => {
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
