const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    rrquired: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = userSchema;