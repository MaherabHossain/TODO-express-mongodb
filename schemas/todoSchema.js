const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  tittle: {
    type: String,
    rrquired: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = todoSchema;
