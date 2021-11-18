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

// instance methods
todoSchema.methods = {
  findActive: function () {
    // finding active todo
    return mongoose.model("Todo").find({ status: "inactive" });
  },
  findActiveCallback: function (cb) {
    return mongoose.model("Todo").find({ status: "active" }, cb);
  },
};

// static method
todoSchema.statics = {
  findByJS: function () {
    return this.find({ tittle: /paying/i });
  },
};

todoSchema.query = {
  byDescription: function (description) {
    return this.find({ description: new RegExp(description, "i") });
  },
};

module.exports = todoSchema;
