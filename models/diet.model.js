const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  diet: {
    type: String,
    required: true,
    trim: true,
  },
  userId:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Diet = mongoose.model("Diet", dietSchema);
module.exports = Diet;